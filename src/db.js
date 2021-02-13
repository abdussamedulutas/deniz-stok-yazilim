let {ipcRenderer} = window.require("electron");

export class Product{
    static $class = "product";
    static async Add(isim, marka, model, barkod, birimfiyati, kdv, renk,descript)
    {
        return await ipcRenderer.invoke("db",{
            action:"add",
            class:this.$class,
            data:{
                isim:isim,
                marka:marka,
                model:model,
                barkod:barkod,
                birimfiyati:birimfiyati,
                kdv:kdv,
                renk:renk,
                descript:descript
            }
        })
    }
    static async Update(id,isim, marka, model, barkod, birimfiyati, kdv, renk,descript)
    {
        await ipcRenderer.invoke("db",{
            action:"update",
            class:this.$class,
            id:id,
            data:{
                isim:isim,
                marka:marka,
                model:model,
                barkod:barkod,
                birimfiyati:birimfiyati,
                kdv:kdv,
                renk:renk,
                descript:descript
            }
        })
    }
    static async Search(isim, marka, model, barkod, birimfiyati, kdv, renk,descript)
    {
        return await ipcRenderer.invoke("db",{
            action:"list",
            class:this.$class,
            limit:1000,
            data:{
                isim:isim,
                marka:marka,
                model:model,
                barkod:barkod,
                birimfiyati:birimfiyati,
                kdv:kdv,
                renk:renk,
                descript:descript
            }
        })
    }
    static async Delete(id)
    {
        await ipcRenderer.invoke("db",{
            action:"update",
            class:this.$class,
            id:id
        })
    }
    static async All()
    {
        return await ipcRenderer.invoke("db",{
            action:"list",
            class:this.$class,
            limit:1000
        })
    }
    static async AllWithDeleted()
    {
        return await ipcRenderer.invoke("db",{
            action:"list",
            class:this.$class,
            limit:1000,
            withDeleted:true
        })
    }
    static async DeletedList()
    {
        return await ipcRenderer.invoke("db",{
            action:"list",
            class:this.$class,
            limit:1000,
            onlyDeleted:true
        })
    }
};

export class User{
    static $class = "user";
    static async Add(isim, soyisim, email, password, descript)
    {
        return await ipcRenderer.invoke("db",{
            action:"add",
            class:this.$class,
            data:{
                isim:isim,
                soyisim:soyisim,
                email:email,
                password:password,
                descript:descript
            }
        })
    }
    static async Update(id,isim, soyisim, email, password, descript)
    {
        await ipcRenderer.invoke("db",{
            action:"update",
            class:this.$class,
            id:id,
            data:{
                isim:isim,
                soyisim:soyisim,
                email:email,
                password:password,
                descript:descript
            }
        })
    }
    static async Search(isim, soyisim, email, password, descript)
    {
        return await ipcRenderer.invoke("db",{
            action:"list",
            class:this.$class,
            limit:1000,
            data:{
                isim:isim,
                soyisim:soyisim,
                email:email,
                password:password,
                descript:descript
            }
        })
    }
    static async Delete(id)
    {
        await ipcRenderer.invoke("db",{
            action:"update",
            class:this.$class,
            id:id
        })
    }
    static async All()
    {
        return await ipcRenderer.invoke("db",{
            action:"list",
            class:this.$class,
            limit:1000
        })
    }
    static async AllWithDeleted()
    {
        return await ipcRenderer.invoke("db",{
            action:"list",
            class:this.$class,
            limit:1000,
            withDeleted:true
        })
    }
    static async DeletedList()
    {
        return await ipcRenderer.invoke("db",{
            action:"list",
            class:this.$class,
            limit:1000,
            onlyDeleted:true
        })
    }
};
export class Client{
    static $class = "client";
    static async Add(isim, soyisim, phone, email, balance, address, descript)
    {
        return await ipcRenderer.invoke("db",{
            action:"add",
            class:this.$class,
            data:{
                isim:isim,
                soyisim:soyisim,
                phone:phone,
                email:email,
                balance:balance,
                address:address,
                descript:descript
            }
        })
    }
    static async Update(id,isim, soyisim, phone, email, balance, address, descript)
    {
        await ipcRenderer.invoke("db",{
            action:"update",
            class:this.$class,
            id:id,
            data:{
                isim:isim,
                soyisim:soyisim,
                phone:phone,
                email:email,
                balance:balance,
                address:address,
                descript:descript
            }
        })
    }
    static async Search(isim, soyisim, phone, email, balance, address, descript)
    {
        return await ipcRenderer.invoke("db",{
            action:"list",
            class:this.$class,
            limit:1000,
            data:{
                isim:isim,
                soyisim:soyisim,
                phone:phone,
                email:email,
                balance:balance,
                address:address,
                descript:descript
            }
        })
    }
    static async Delete(id)
    {
        await ipcRenderer.invoke("db",{
            action:"update",
            class:this.$class,
            id:id
        })
    }
    static async All()
    {
        return await ipcRenderer.invoke("db",{
            action:"list",
            class:this.$class,
            limit:1000
        })
    }
    static async AllWithDeleted()
    {
        return await ipcRenderer.invoke("db",{
            action:"list",
            class:this.$class,
            limit:1000,
            withDeleted:true
        })
    }
    static async DeletedList()
    {
        return await ipcRenderer.invoke("db",{
            action:"list",
            class:this.$class,
            limit:1000,
            onlyDeleted:true
        })
    }
};