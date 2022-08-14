const { response } = require("express");
const express = require("express");
const { Router } = express;
const Productos = require("../containers/products");

const tipoUsario = 1;
const adm = 1;
const user = 2;

const producto = new Productos();

const router = Router();

router.get("/productos/:id?", async (req, res) => {
  if (tipoUsario == adm || tipoUsario == user) {
    const id = req.params.id;
    if (!!id) {
      res.send(await producto.getById(id));
    } else {
      res.send(await producto.getAll());
    }
  } else {
    res.status(401).send({ error : -1, descripcion: "ruta /productos/id  método 'get' no autorizada" });
  }
});

router.post("/productos", async (req, res) => {
  if (tipoUsario == adm) {
    const obj = req.body;
    obj.timestamp = Date.now()
    const response= await producto.save(obj)
    console.log(response)
    response!=null?res.status(201).send():res.status(500).send();
  } else {
    res.status(401).send({ error : -1, descripcion: "ruta /productos/  método 'post' no autorizada" });
  }
});

router.put("/productos/:id", async (req, res) => {
  if (tipoUsario == adm) {
    const id = req.params.id;
    const obj = req.body;
    obj.timestamp = Date.now()
    const result = await producto.updateById(id, obj);
    response!=null?res.status(201).send():res.status(500).send()
    // res.send({ result: result }).status(201);
  } else {
    res.status(401).send({ error : -1, descripcion: "ruta /productos/:id  método 'put' no autorizada" });
  }
});

router.delete("/productos/:id", async (req, res) => {
  if (tipoUsario == adm) {
    const id = req.params.id;
    const result = await producto.deleteById(id);
    result!=null?res.status(201).send():res.status(500).send()
  } else {
    res.status(401).send({ error : -1, descripcion: "ruta /productos/:id  método 'delete' no autorizada" });
  }
});

module.exports = router;
