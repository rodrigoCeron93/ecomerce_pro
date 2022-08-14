const { response } = require("express");
const express = require("express");
const { Router } = express;
const Carrito = require("../containers/cart");



const carrito = new Carrito();

const router = Router();


router.post("/carrito", async (req, res) => {
   
      const obj = req.body;
      obj.timestamp = Date.now()
      console.log(res)
      const response= await carrito.save(obj)
      console.log(response)
      response!=null?res.status(201).send({id:response.id}):res.status(500).send();
   
  });

  router.delete("/carrito/:id", async (req, res) => {
      const id = req.params.id;
      const result = await carrito.deleteById(id);
      result!=null?res.status(201).send():res.status(500).send()
   
  });
  

router.get("/carrito/:id/productos", async (req, res) => {
    const id = req.params.id;
    if (!!id) {
      res.send(await carrito.getById(id));
    } else {
      res.send(await carrito.getAll());
    }
  
});


router.post("/carrito/:id/productos", async (req, res) => {

      const obj = req.body;

      const response= await carrito.saveProduct(req.params.id,obj)
    
      response!=null?res.status(201).send({id:response.id}):res.status(500).send();
  });


router.delete("/carrito/:id/productos/:idproduct", async (req, res) => {
  
      const id = req.params.id;
      const idproduct= req.params.idproduct
      const result = await carrito.deleteProductsById(id,idproduct);
      result!=null?res.status(201).send():res.status(500).send()
  });

module.exports = router;
