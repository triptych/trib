/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('Weather', function(Y, NAME) {

/**
 * The Weather module.
 *
 * @module Weather
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
 index: function (ac) {

            //Retrieving GET params
            
            var geoParams = ac.params.url(),
                yqlModel;

                Y.log(geoParams,"debug");

            if (geoParams.longitude && geoParams.latitude) {
                //we do this || for backwards compatibility
                yqlModel = ac.models.WeatherModelYQL || ac.models.get('WeatherModelYQL');
                //Call YQLModel to retrieve the Weather for that location
                yqlModel.getData(geoParams, function (err, data) {
                    if (err) {
                        ac.error(err);
                        return;
                    }
                    //With "ac.done" we pass the data to be render
                    //into the view: (see index.mu.html)
                    //After the data is rendered will be shipped to the client.
                    Y.log("yql data","debug");
                    Y.log(data);

                    //ac.done(data);
                    data = {
                        location : "foo"
                    };
                    ac.done(data);
                });
            } else {
                //passing an empty object to the view
                //will make the view render partially
                ac.done({});
            }
            
            //var geoParams = ac.params.getFromUrl(), yqlModel;

            Y.log("hello", "debug");
            Y.log(ac.params, "debug");

            ac.done({});
        }

    };

}, '0.0.1', {requires: [
    'mojito',
    'mojito-assets-addon',
    'mojito-models-addon',
    'mojito-params-addon',
    'WeatherModelFoo'
    ]});
