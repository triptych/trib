/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('WeatherBinderIndex', function(Y, NAME) {

/**
 * The WeatherBinderIndex module.
 *
 * @module WeatherBinderIndex
 */

    /**
     * Constructor for the WeatherBinderIndex class.
     *
     * @class WeatherBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
            this.loaded = false;
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
            var me = this;
            this.node = node;

            if (this.loaded) {
                //this.temperature = Y.one('#temp');
                //Y.one('.toggle').on('click', Y.bind(this.toggleTemperature, this));
                //Y.one('.tweets').on('click', Y.bind(this.showTweets, this));
            } else {
                Y.one('.getLocation').on('click', Y.bind(this.handleLocation, this));
            }
            /**
             * Example code for the bind method:
             *
             * node.all('dt').on('mouseenter', function(evt) {
             *   var dd = '#dd_' + evt.target.get('text');
             *   me.node.one(dd).addClass('sel');
             *
             * });
             * node.all('dt').on('mouseleave', function(evt) {
             *   
             *   var dd = '#dd_' + evt.target.get('text');
             *   me.node.one(dd).removeClass('sel');
             *
             * });
             */
        },
    handleLocation: function (e) {
            e.halt();
            this.getCurrentLocation({
                context: this,
                onSuccess: Y.bind(this.onSuccessGetLocation, this)
            });

            e.currentTarget.setContent('Loading...');
        },
        toggleTemperature: function (e) {
            e.halt();
            var value = this.temperature.one('.value'),
                unit = this.temperature.one('.unit');

            if (unit.get('text') === 'F') {
                value.setContent(Y.Convert.toCelsius(value.get('text')));
                unit.setContent('C');
            } else {
                value.setContent(Y.Convert.toFahrenheit(value.get('text')));
                unit.setContent('F');
            }
        },
        getCurrentLocation: function (config) {
            var userSuccess = config.context === 'undefined' ? config.onSuccess : Y.bind(config.onSuccess, config.context),
                success = Y.bind(userSuccess, this),
                error = typeof config.onError === 'function' ? config.onError : function (evt) {Y.log(evt); },
                options = typeof config.options !== 'undefined' ? config.options : {enableHighAccuracy: true};

            navigator.geolocation.getCurrentPosition(success, error, options);
        },
        onSuccessGetLocation: function (geoPosition) {
            var coords = geoPosition.coords;
            this.mojitProxy.refreshView({
                params: {
                    url: {
                        longitude: coords.longitude,
                        latitude: coords.latitude
                    }
                }
            }, Y.bind(this.afterRefreshView, this));
        },
        afterRefreshView: function (node,renderedView) {
            //re-bind the DOM
            this.loaded = true;
            this.bind();
        }       

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});
