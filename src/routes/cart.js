const { response } = require("express");
const express = require("express");
const { Router } = express;
const Carrito = require("../containers/cart");

const tipoUsario = 1;
const adm = 1;
const user = 2;

const carrito = new Carrito();

const router = Router();


router.post("/carrito", async (req, res) => {
    if (tipoUsario == adm) {
      const obj = req.body;
      obj.timestamp = Date.now()
      const response= await carrito.save(obj)
      console.log(response)
      response!=null?res.status(201).send({id:response.id}):res.status(500).send();
    } else {
      res.status(401).send({ error : -1, descripcion: "ruta /productos/  método 'post' no autorizada" });
    }
  });

  router.delete("/carrito/:id", async (req, res) => {
    if (tipoUsario == adm) {
      const id = req.params.id;
      const result = await carrito.deleteById(id);
      result!=null?res.status(201).send():res.status(500).send()
    } else {
      res.status(401).send({ error : -1, descripcion: "ruta /productos/:id  método 'delete' no autorizada" });
    }
  });
  

router.get("/carrito/:id/productos", async (req, res) => {
  if (tipoUsario == adm || tipoUsario == user) {
    const id = req.params.id;
    if (!!id) {
      res.send(await carrito.getById(id));
    } else {
      res.send(await carrito.getAll());
    }
  } else {
    res.status(401).send({ error : -1, descripcion: "ruta /productos/id  método 'get' no autorizada" });
  }
});


router.post("/carrito/:id/productos", async (req, res) => {
    if (tipoUsario == adm) {
      const obj = req.body.productos;

      const response= await carrito.saveProduct(req.params.id,obj)
    
      response!=null?res.status(201).send({id:response.id}):res.status(500).send();
    } else {
      res.status(401).send({ error : -1, descripcion: "ruta /productos/  método 'post' no autorizada" });
    }
  });


router.delete("/carrito/:id/productos/id", async (req, res) => {
    if (tipoUsario == adm) {
      const id = req.params.id;
      const result = await carrito.deleteById(id);
      result!=null?res.status(201).send():res.status(500).send()
    } else {
      res.status(401).send({ error : -1, descripcion: "ruta /productos/:id  método 'delete' no autorizada" });
    }
  });

module.exports = router;
