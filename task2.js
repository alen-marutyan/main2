const paths = (n) => {
    if ( n === 1) {
        return n;
    }

    return n * paths( n - 1 );
}

console.log(paths(4))
