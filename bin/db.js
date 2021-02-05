let knex = require("knex");

let db = knex({
    dialect:"sqlite",
    connection:{
        filename:"database/users.db",
        charset:"utf8"
    }
});
(async function(){
    await db.schema.createTableIfNotExists("users",function(table){
        table.binary("id",16).notNullable().primary();
        table.text("isim");
        table.text("soyisim");
        table.text("email").notNullable();
        table.text("password").notNullable();
        table.dateTime("createdate").notNullable().defaultTo(db.fn.now());
        table.dateTime("updatedate").notNullable().defaultTo(db.fn.now());
        table.dateTime("deletedate").nullable();
    });
})();



/*

KULLANICI
    ID
    isim
    soyisim
    email
    password
    descript
    createdate
    updatedate
    deletedate
    
Müşteriler
    ID
    isim
    soyisim
    descript
    createdate
    updatedate
    deletedate
    
Ürün
    ID
    marka    
    model
    barkod
    birimfiyati
    model
    kdv
    renk
    descript
    createdate
    updatedate
    deletedate

ürünstokları
    ID
    ürünid
    stok
    alısfiyati
    createdate
    updatedate

fatura
    ID
    musteriid
    tutar
    odemeid
    descript
    createdate
    updatedate
    deletedate

fatura_urun
    faturaid
    urunid
///// 2. aşama
odeme
    ID
    paytype     /pesin  /taksit
    paymented   0|1 odendi/odenmedi
    taxcount    toplam taksit sayısı
    payedtax    ödenen taksit sayısı
    nextpaydate bir sonraki ödeme tarihi
    ıban        kart ibanı
    notes       açıklama
*/