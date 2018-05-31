
const petModel = require('../models/pets');					

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		petModel.findById(req.params.petId, function(err, petInfo){
			if (err) {
				next(err);
			} else {
				res.json(petInfo);
				//res.json({status:"success", message: "pet found!!!", data:{pets: petInfo}});
			}
		});
	},

	getByCat: function(req, res, next) {
		console.log('Req params');
		console.log(req.params);
		petModel.find({'categoryName' : req.params.cat}, function(err, petInfo){
			if (err) {
				next(err);
			} else {
				res.json(petInfo);
				//res.json({status:"success", message: "pet found!!!", data:{pets: petInfo}});
			}
		});
	},



	getAll: function(req, res, next) {
		let petsList = [];

		petModel.find({}, function(err, pets){
			if (err){
				next(err);
			} else{
				for (let pet of pets) {
					petsList.push({id: pet._id, name: pet.name, categoryName: pet.categoryName, status: pet.status,
						              origin: pet.origin, age: pet.age});
				}
				res.status(200).json(petsList);
				//res.json({status:"success", message: "pets list found!!!",  data : {pets: petsList}});
							
			}

		});
	},

	updateById: function(req, res, next) {
		console.log('updateById');
		console.log(req._id);
		petModel.findByIdAndUpdate(req.params.petId,{name:req.body.name, categoryName: req.body.categoryName,origin: req.body.origin, 
			    status: req.body.status, age: req.body.age}, function(err, petInfo){

			if(err)
				next(err);  
			else {
				res.status(200).json(petInfo);
				//res.json({status:"success", message: "pet updated successfully!!!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		petModel.findByIdAndRemove(req.params.petId, function(err, petInfo){
			if(err)
				next(err);
			else {
				res.status(200).json(req.params.id);

				//res.json({status:"success", message: "pet deleted successfully!!!", data:null});
			}
		});
	},

	create: function(req, res, next) { 
		petModel.create({ name: req.body.name,  categoryName: req.body.categoryName,
			               origin: req.body.origin, status: req.body.status, age: req.body.age }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				    res.status(200).json({ name: req.body.name,  categoryName: req.body.categoryName,
						origin: req.body.origin, status: req.body.status, age: req.body.age });
				  	//res.json({status: "success", message: "pet added successfully!!!", data: null});
				  
				});
	},

}					