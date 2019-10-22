describe('map', function () {

    it('should succeed on correct expression, aing all numbers 2 and resulting in new array', function () {
        
        var numbers = [1, 2, 3];
        var result = [];
        
            var a = function (number) { 
                
               return number + 2;
            };

        result = map(numbers, a);
        var expected = [3, 4, 5];

        expect(result).toEqual(expected);
        expect(a).toBeInstanceOf(Function);
    });

    it('should fail on non-function expression', function () {
       
        var numbers = [1, 2, 3];

        expect(function () { map(numbers); }).toThrowError('undefined is not a function');
        expect(function() { map(numbers, true); }).toThrowError('true is not a function');
        expect(function() { map(numbers, 1); }).toThrowError('1 is not a function');
    });
});