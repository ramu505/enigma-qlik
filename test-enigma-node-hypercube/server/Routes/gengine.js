const enginecontroller = require('../controllers/qengine.ctrl'),
cubecontroller = require('../controllers/cube.ctrl')

module.exports = (router) => {
/**
* get All Apps
*/
router
.route('/apps')
.get(enginecontroller.getApps);

router.route('/hypercube').get(cubecontroller.getHperCube);

}