let knex = require("knex");
let fs = require("fs");
let moment = require("moment");
let crypto = require("crypto");
function randomId()
{
    return crypto.randomBytes(16)
}
function sha256(str)
{
    let hash = crypto.createHash("sha256");
    hash.update(str);
    return hash.digest("hex");
}
let db = knex({
    dialect:"sqlite",
    connection:{
        filename:"database/data.db",
        charset:"utf8"
    }
});
(async function(){
    let t = moment().format("D-M-YYYY");
    await new Promise(ok=>{
        fs.access("database/data.db",(err)=>{
            if(err) return ok();
            fs.copyFile("database/data.db","database/data-"+t+".db.backup",(err)=>{
                if(!err) ok();
            })
        })
    });
    await db.schema.createTableIfNotExists("settings",function(table){
        table.text("name");
        table.text("value");
    });
    await db.schema.createTableIfNotExists("user",function(table){
        table.binary("id",16).notNullable().primary();

        table.text("isim");
        table.text("soyisim");
        table.text("email").notNullable();
        table.text("password").notNullable();
        table.text("descript");
        table.dateTime("createdate").notNullable().defaultTo(db.fn.now());
        table.dateTime("updatedate").notNullable().defaultTo(db.fn.now());
        table.dateTime("deletedate").nullable();
    });
    await db.schema.createTableIfNotExists("client",function(table){
        table.binary("id",16).notNullable().primary();

        table.text("isim");
        table.text("soyisim");
        table.text("phone");
        table.text("email");
        table.double("balance");
        table.text("address");
        table.text("descript");
        
        table.dateTime("createdate").notNullable().defaultTo(db.fn.now());
        table.dateTime("updatedate").notNullable().defaultTo(db.fn.now());
        table.dateTime("deletedate").nullable();
    });
    await db.schema.createTableIfNotExists("product",function(table){
        table.binary("id",16).notNullable().primary();

        table.text("isim");
        table.text("marka");
        table.text("model");
        table.string("barkod");
        table.double("satisfiyati");
        table.double("kdv");
        table.string("renk");
        table.integer("stok");
        table.double("alisfiyati");
        table.text("descript");
        table.dateTime("createdate").notNullable().defaultTo(db.fn.now());
        table.dateTime("updatedate").notNullable().defaultTo(db.fn.now());
        table.dateTime("deletedate").nullable();
    });
    await db.schema.createTableIfNotExists("invoice",function(table){
        table.binary("id",16).notNullable().primary();

        table.binary("clientid",16).notNullable();
        table.double("tutar");
        table.binary("paymentid",16).notNullable();
        
        table.text("descript");
        table.dateTime("createdate").notNullable().defaultTo(db.fn.now());
        table.dateTime("updatedate").notNullable().defaultTo(db.fn.now());
        table.dateTime("deletedate").nullable();
    });
    await db.schema.createTableIfNotExists("invoice_product",function(table){
        table.binary("invoiceid",16).notNullable();
        table.binary("productid",16).notNullable();
    });

    let k = await db.table("settings").where({name:"database"}).limit(1).first();
    if(!k || k.value != "ready"){
        await db.table("user").insert({
            id:randomId(),
            isim:"Abdussamed",
            soyisim:"ULUTAŞ",
            email:"abdussamed@account",
            password:sha256("123456"),
            descript:"Test KUllanıcı"
        })
        await db.table("settings").insert([{
            name:"database",
            value:"ready"
        }]);
    }
    
})();



/*

ayarlar (settings)
    name
    value

KULLANICI (users)
    ID
    isim
    soyisim
    email
    password
    descript
    createdate
    updatedate
    deletedate
    
Müşteriler (clients)
    ID
    isim
    soyisim
    descript
    createdate
    updatedate
    deletedate
    
Ürün (product)
    ID
    isim
    marka    
    model
    barkod
    birimfiyati
    kdv
    renk
    descript
    createdate
    updatedate
    deletedate

ürünstokları (productstocks)
    ID
    ürünid
    stok
    alısfiyati
    createdate
    updatedate
    deletedate

fatura (invoice)
    ID
    musteriid
    tutar
    odemeid
    descript
    createdate
    updatedate
    deletedate

fatura_urun (invoice_products)
    faturaid
    urunid
///// 2. aşama
odeme (payment)
    ID
    paytype     /pesin  /taksit
    paymented   0|1 odendi/odenmedi
    taxcount    toplam taksit sayısı
    payedtax    ödenen taksit sayısı
    nextpaydate bir sonraki ödeme tarihi
    ıban        kart ibanı
    notes       açıklama
*/


let {ipcMain} = require("electron");

ipcMain.handle("auth",async function(event,ride,arg1,arg2){
    switch(ride)
    {
        case "login":{
            let user = await db.table("user").where({
                password:sha256(arg2),
                email:arg1
            }).first();
            return user?.id.toString("hex");
        }
    }
});
ipcMain.handle("db",async function(event,pack){
    switch(pack.action)
    {
        case "add":{
            let id = randomId();
            pack.data.id = id;
            await db.table(pack.class).insert(pack.data);
            return id.toString("hex")
        }
        case "update":{
            await db.table(pack.class).update(pack.data).where({
                id:Buffer.from(pack.id,"hex")
            });
            return id.toString("hex")
        }
        case "list":{
            let sql = db.table(pack.class).select(pack.column ? pack.column : "*");
            if(pack.withDeleted == null) sql.whereNull("deletedate");
            else if(pack.onlyDeleted) sql.whereNotNull("deletedate");
            if(typeof pack.limit == "number")  sql.limit(pack.limit);
            if(typeof pack.offset == "number")  sql.offset(pack.offset);
            if(pack.filter){
                sql.where(pack.filter)
            };
            if(pack.id){
                sql.where({
                    id:Buffer.from(pack.id,"hex")
                })
            };
            return (await sql).map(idBufferToHex);
        }
        case "get":{
            return idBufferToHex(
                await db.table(pack.class).select("*").where({
                    id:Buffer.from(pack.id,"hex")
                }).limit(1).first()
            )
        }
        case "search":{
            let t = db.table(pack.class);
            if(pack.withDeleted == null) sql.whereNull("deletedate");
            if(typeof pack.limit == "number")  sql.limit(pack.limit);
            if(typeof pack.offset == "number")  sql.offset(pack.offset);
            for(let key in pack.data)
            {
                let value = pack.data[key];
                t.where(key,'like','%'+value+'%')
            };
            return (await t).map(idBufferToHex);
        }
        case "delete":{
            if(typeof pack.id == "number")
            {
                return await db.table(pack.class).delete().where({
                    id:Buffer.from(pack.id,"hex")
                })
            }else{
                let ids = pack.id.map(i => Buffer.from(i,"hex"));
                return await db.table(pack.class).delete().whereIn("id",ids)
            }
        }
    }
})
function idBufferToHex(i)
{
    if(i.id) i.id = i.id.toString("hex");
    return i;
}