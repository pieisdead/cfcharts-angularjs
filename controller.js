ChartsApp.controller('chartController', function($scope) {
    $scope.values = [111, 55, 125, 32, 28];
    $scope.changeValues = function(id) {
        $('#' + id).attr('values', '[20, 60, 30, 20, 10]');
        $('#' + id).remove();
        
    }
});