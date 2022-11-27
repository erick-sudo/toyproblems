//Calculate the total gross pay
function grossIncome(...values) {
    let sum = 0
    for(let value of values) {
        sum+=value
    }

    return sum
}

// A function that takes marks as an argument
// and assigns a grade
function grade(marks) {
        if (marks < 40){
            return "E"
        } else if(marks < 50) {
            return "D"
        } else if(marks < 60) {
            return "C"
        } else if(marks < 80) {
            return "B"
        } else {
            return "A"
        }
}


//Speed governor
function speedGovernor(speed){
    if(speed <= 70){
        return "OK"
    } else {
        const demeritPoints = Math.floor((speed - 70)/5)

        return demeritPoints>12 ? 'License Suspended' : `${demeritPoints} Demerit Points!`
    }
}

//Calculate NHIF deduction
function NHIF(grossPay) {

    if(grossPay < 6000){
        return 150
    }
    else if(grossPay < 8000){
        return 300
    }
    else if(grossPay < 12000){

        return 400
    }
    else if(grossPay < 15000){

        return 500
    }
    else if(grossPay < 20000){

        return 600
    }
    else if(grossPay < 25000){

        return 750
    }
    else if(grossPay < 30000){

        return 850
    }
    else if(grossPay < 35000){

        return 900
    }
    else if(grossPay < 40000){

        return 950
    }
    else if(grossPay < 45000){

        return 100
    }
    else if(grossPay < 50000){

        return 110
    }
    else if(grossPay < 60000){

        return 120
    }
    else if(grossPay < 70000){

        return 130
    }
    else if(grossPay < 80000){

        return 140
    }
    else if(grossPay < 90000){

        return 150
    }
    else if(grossPay < 10000){
        return 160
    }
    else{
        return 1700
    }
}

//Calculate NSSF Deductions
function NSSF(pensionablePay){
    return (pensionablePay * 0.06)
}


//Calculate grossPay
function taxableIncome(grossPay,...deductions) {
    for(let deduction of deductions){
        grossPay-=deduction
    }
    return grossPay
}

//Calculate PAYE
function calculatePayee(taxableIncome) {
    switch(taxableIncome) {
        case taxableIncome<=24000:
            return 0.10 * taxableIncome
        case taxableIncome<=32333:
            return 0.25 * taxableIncome
        default:
            return 0.30 * taxableIncome
    }
}

function handleGrade(event) {
    document.getElementById("grade").textContent = grade(parseInt(document.getElementById("marks").value))
}

function handleSpeed(event){
    let speed = parseInt(document.getElementById("speed").value)
    let points = speedGovernor(speed)
    let notify = document.getElementById("notify")
    notify.textContent = points
    if(points === "OK"){
        notify.style.color = "white"
    } else{
        notify.style.color = "red"
    }
}

function handleSalary(event){
    let b = document.getElementById("basic").value
    let basic = Boolean(b) ? parseFloat(b) : 0
    let allowances = Array.from(document.querySelectorAll(".allowances")).map(element => Boolean(element.value) ? parseFloat(element.value) : 0)
    console.log(basic)
    let gross = grossIncome(basic, ...allowances)
    console.log(gross)
    let nhif = NHIF(gross)
    let nssf = NSSF(gross) 
    let deductions = []

    let taxableincome = taxableIncome(gross, nhif, nssf)

    let payee = calculatePayee(taxableincome)

    let net = (taxableincome - payee) - nhif- nssf

    document.getElementById("nhif").textContent = nhif
    document.getElementById("nssf").textContent = nssf
    document.getElementById("paye").textContent = payee
    document.getElementById("netsalary").textContent = net
}
