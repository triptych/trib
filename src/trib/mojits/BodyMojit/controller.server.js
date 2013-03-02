/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('BodyMojit', function(Y, NAME) {

/**
 * The BodyMojit module.
 *
 * @module BodyMojit
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
        Y.log("BodyMojit - controller.server.js index called");

         //   ac.done({
         //       title: ""
         //   });


            ac.composite.done({
                title: "body content"
            });
   

/**
            var model = ac.models.get('StatsModelYQL');
            Y.log(model);
            model.getData({}, function(data){
                Y.log("bodymojit -index - model.getData:");
                Y.log(data);

                ac.done({
                    title: "",
                    watchers: data.watchers,
                    forks: data.forks
                });
            });
**/
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'BodyMojitModelFoo','mojito-composite-addon']});
