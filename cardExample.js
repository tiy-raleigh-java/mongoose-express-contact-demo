let Card = function(myValue, mySuit, myCardIsFaceUp) {
  this.suit = mySuit;
  this.value = myValue;

  let isFaceUp = myCardIsFaceUp;
  let timesFlipped = 0;

  this.flip = function() {
    if (timesFlipped < 4) {
      console.log(`${this.value} of ${this.suit} was flipped over.`);
      isFaceUp = !isFaceUp;
      timesFlipped++;
    } else {
      console.log("you can't flip this card any more times.");
    }
  };

  this.describe = function() {
    if (isFaceUp) {
      return `${this.value} of ${this.suit} and was flipped ${timesFlipped} times.`;
    } else {
      return '*******  and was flipped ${timesFlipped} times.';
    }
  };
};

let foo = new Card('king', 'hearts', true);
foo.flip();
foo.flip();
foo.flip();

console.log('foo', foo.describe());
//
// foo.flip();
// console.log('Foo', foo.describe());
//
// foo.flip();
// console.log('Foo', foo.describe());
//
// foo.flip();
// console.log('Foo', foo.describe());
//
// foo.flip();
// console.log('Foo', foo.describe());

//
// let bar = new Card('queen', 'spades');
//
// console.log('Foo', foo.describe());
// console.log('Bar', bar.describe());
