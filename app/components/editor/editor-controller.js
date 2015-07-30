angular.module("ClauseMatch")

.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state("editor", {
        url: "/editor",
        templateUrl: "build/templates/editor.html",
        controller: "EditorController"
    })
}])

.controller('EditorController', ['$scope', function ($scope) {

    $scope.paragraphs = [new Paragraph()];

    $scope.json = { data: JSON.stringify($scope.paragraphs) };

    // Gets the result JSON
    $scope.getResult = function () {
        var data = [];
        for (var i in $scope.paragraphs) {
            data.push($scope.paragraphs[i].text);
        }
        var json = {
            data: data
        }

        // Returns stringified object
        // Added spacing level for JSON to be easily human-readable
        return JSON.stringify(json, null, 2);
    }

    // Insert new paragraph at position
    $scope.addParagraph = function (pos) {
        var paragraph = new Paragraph(); // Creates new Paragraph object from model
        $scope.paragraphs.splice(pos + 1, 0, paragraph);
    }

    // Remove paragraph (if there are more than one)
    $scope.removeParagraph = function (pos) {
        if ($scope.paragraphs.length > 1) {
            $scope.paragraphs.splice(pos, 1);
        }
    }


}]);