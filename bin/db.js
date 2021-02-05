const { fstat } = require("fs");
let knex = require("knex");
let fs = require("fs");
let moment = require("moment");
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
    let db = knex({
        dialect:"sqlite",
        connection:{
            filename:"database/data.db",
            charset:"utf8"
        }
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
        table.double("birimfiyati");
        table.double("kdv");
        table.string("renk");

        table.text("descript");
        table.dateTime("createdate").notNullable().defaultTo(db.fn.now());
        table.dateTime("updatedate").notNullable().defaultTo(db.fn.now());
        table.dateTime("deletedate").nullable();
    });
    await db.schema.createTableIfNotExists("productstock",function(table){
        table.binary("id",16).notNullable().primary();

        table.binary("productid",16).notNullable();
        table.integer("stok");
        table.double("alısfiyati");
        
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

    await db.table("settings").insert([{
        name:"admin_password",
        value:"123456"
    },{
        name:"admin_email",
        value:"deniz@account"
    }]);
    await db.table("user").insert({
        id:Buffer.alloc(16),
        isim:"Abdussamed",
        soyisim:"ULUTAŞ",
        email:"abdussamed@account",
        password:"123456",
        descript:"Test KUllanıcı"
    })
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