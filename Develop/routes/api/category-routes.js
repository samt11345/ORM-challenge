const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  // find all categories
 await Category.findAll({
    attributes:  ["id", "category_name"],
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }]
  })
.then ((categories) =>{
  res.json(categories);
})
})

  // be sure to include its associated Products



router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {id: req.params.id},
    include: [Product]
  }).then((data)=>{
    res.json(data)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then((data)=>{res.json(data)})
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {where: {id: req.params.id}}).then((data)=>{
    res.json(data)
  })

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({where: {id: req.params.id}}).then((data)=>{
    res.json(data)
  })
});

module.exports = router;
