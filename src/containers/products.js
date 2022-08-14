const fs = require("fs");

class Productos{
    namefile="../BACKEND-ECOMERCE/src/db/products.txt"


    constructor(id, nombre,timestamp,descripcion,codigo,url,precio,stock){
        this.id=id;
        this.timestamp=timestamp;
        this.nombre = nombre;
        this.descripcion =descripcion;
        this.codigo =codigo;
        this.url = url;
        this.precio= precio;
        this.stock= stock;
    }

    async getById(id){
        try {
            let content = await fs.promises.readFile(this.namefile, "utf8");
            if (content != "") {
              const contentObj = JSON.parse(content);
              let obj = null;
              obj = contentObj.filter((o) => o.id == id);
              return obj;
            } else {
              return null;
            }
          } catch (error) {
            console.log(error);
          }
    }

    async getAll(){
      try {
        let content = await fs.promises.readFile(this.namefile, "utf8");
        if (content != "") {
          let contentObj = JSON.parse(content);
          return contentObj;
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
      }
    }

    async save(obj) {
      try {
        let content = await fs.promises.readFile(this.namefile, "utf8");
        console.log(  content != "")
        if ( content != "") {
          
          let contentObj = JSON.parse(content);
          let lastId = contentObj.at(-1).id;
          obj.id = lastId + 1;
          contentObj.push(obj);
          await fs.promises.writeFile(this.namefile, JSON.stringify(contentObj));
          return obj;
        } else {
          obj.id = 0;
          await fs.promises.appendFile(this.namefile, JSON.stringify([obj]));
          return obj;
        }
      } catch (error) {
        console.log(error);
        return null
      }
    }

    async deleteById(id) {
      try {
        let content = await fs.promises.readFile(this.namefile, "utf8");
        if (content != "") {
          const contentObj = JSON.parse(content);
          let obj = null;
          obj = contentObj.filter((o) => o.id != id);
          
          await fs.promises.writeFile(this.namefile, obj.length!=0?JSON.stringify(obj):"");
          return 1
        }
      } catch (error) {
        console.log(error);
        return null
      }
    }

    async updateById(id,obj) {
      await this.deleteById(id)
      try {
          let content = await fs.promises.readFile(this.namefile, "utf8");
          let contentObj = JSON.parse(content);
          obj.id = id;
          contentObj.push(obj);
          await fs.promises.writeFile(this.namefile, JSON.stringify(contentObj));
          return 1;

      } catch (error) {
        console.log(error);
        return null
      }
      
    }

}

module.exports= Productos