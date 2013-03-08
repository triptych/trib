YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Controller",
        "WeatherModelFoo",
        "testingModelFoo"
    ],
    "modules": [
        "Weather",
        "testing"
    ],
    "allModules": [
        {
            "displayName": "testing",
            "name": "testing",
            "description": "The testingModelFoo module."
        },
        {
            "displayName": "Weather",
            "name": "Weather",
            "description": "The WeatherModelFoo module."
        }
    ]
} };
});