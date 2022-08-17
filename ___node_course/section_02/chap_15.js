const mission = 'learn';

if (mission === 'learn') {
    console.log('Time to learn Node JS');
} else {
    // This is better than...
    console.log(`Is ${mission} really fun?`);
    // this:
    console.log('Is ' + mission + 'really fun?');
}
