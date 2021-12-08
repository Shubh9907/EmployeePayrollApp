/**
 * Event Listner for name input
 */
const text = document.querySelector('#name');
const textError = document.querySelector('.text-error');
text.addEventListener('input', function() {
    let nameRegex = RegExp("^[A-Z][a-z]{2,} [A-Z][a-z]{2,}$");
    if (nameRegex.test(text.value))
    textError.textContent = "";
    else textError.textContent= "Name is Incorrect";
});

/**
 * Event listner for salary range
 */
const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function(){ 
    output.textContent = salary.value;
});