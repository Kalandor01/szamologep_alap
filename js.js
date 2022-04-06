window.onload = init;

function query(name) {
    return document.querySelector(name);
}

function query_all_raw(name) {
    return document.querySelectorAll(name);
}

function query_all(name, arg) {
    document.querySelectorAll(name).forEach(elem => {arg(elem)});
}

var muvjel = null;
var shows_ans = false;

function init()
{
    //num buttons
    for (let x = 0; x < 10; x++) {
        query(".szamok").innerHTML += `<button>${x}</button>`;
    }
    query_all(".szamok button", q=>q.onclick = clicked_num);
    //numbers buttons
    query("#osszeadas").onclick = clicked_muvjel;
    query("#kivonas").onclick = clicked_muvjel;
    query("#szorzas").onclick = clicked_muvjel;
    query("#osztas").onclick = clicked_muvjel;
    query("#dot").onclick = clicked_dot;
    query("#egyenlo").onclick = egyenlo;
    query("#torles").onclick = clear;
}

function clicked_num(evt)
{
    if(query(".kijelzo .eredmeny").innerHTML != "")
        clear();
    query(".kijelzo .kifejezes").innerHTML += evt.target.innerHTML;
}

function clicked_dot(evt)
{
    let last_jel = query(".kijelzo .kifejezes").innerHTML.slice(-1);
    if(last_jel != "+" && last_jel != "-" && last_jel != "*" && last_jel != "/" && last_jel != "." && last_jel != "=")
        query(".kijelzo .kifejezes").innerHTML += evt.target.innerHTML;
}

function clicked_muvjel(evt)
{
    let last_jel = query(".kijelzo .kifejezes").innerHTML.slice(-1);
    if(last_jel != "+" && last_jel != "-" && last_jel != "*" && last_jel != "/" && last_jel != "." && last_jel != "=")
    {
        if(query(".kijelzo .eredmeny").innerHTML.replace("<br>", "") != "")
        {
            query(".kijelzo .kifejezes").innerHTML = query(".kijelzo .eredmeny").innerHTML.replace("<br>", "");
            shows_ans = false;
            query(".kijelzo .eredmeny").innerHTML = "";
            query(".kijelzo .kifejezes").innerHTML += evt.target.innerHTML;
            muvjel = evt.target.innerHTML;
            console.log(query(".kijelzo .kifejezes").innerHTML + "\nMűvjel: " + muvjel);
        }
        else if(query(".kijelzo .kifejezes").innerHTML != "")
        {
            query(".kijelzo .kifejezes").innerHTML += evt.target.innerHTML;
            muvjel = evt.target.innerHTML;
            console.log(query(".kijelzo .kifejezes").innerHTML + "\nMűvjel: " + muvjel);
        }
    }
}

function egyenlo(evt)
{
    let last_jel = query(".kijelzo .kifejezes").innerHTML.slice(-1);
    if(query(".kijelzo .kifejezes").innerHTML != "" && !shows_ans && last_jel != "+" && last_jel != "-" && last_jel != "*" && last_jel != "/" && last_jel != "." && last_jel != "=")
    {
        let numbers = query(".kijelzo .kifejezes").innerHTML.split(/\/|\*|\+|\-/);
        let muvjelek_raw = query(".kijelzo .kifejezes").innerHTML.split(/\d|\./);
        let muvjelek = []
        muvjelek_raw.forEach(jel => {
            if(jel!="")
                muvjelek.push(jel);
        });
        query(".kijelzo .kifejezes").innerHTML += evt.target.innerHTML;
        console.log(numbers + "\n" + muvjelek);
        let eredmeny = 0;
        switch (muvjel)
        {
            case "+":
                eredmeny = parseFloat(numbers[0]) + parseFloat(numbers[1]);
                break;
            case "-":
                eredmeny = parseFloat(numbers[0]) - parseFloat(numbers[1]);
                break;
            case "*":
                eredmeny = parseFloat(numbers[0]) * parseFloat(numbers[1]);
                break;
            case "/":
                eredmeny = parseFloat(numbers[0]) / parseFloat(numbers[1]);
                break;
            default:
                eredmeny = numbers[0];
                break;
        }
        query(".kijelzo .eredmeny").innerHTML = "<br>" + eredmeny;
        shows_ans = true;
    }
}

function clear()
{
    query(".kijelzo .kifejezes").innerHTML = "";
    muvjel = null;
    query(".kijelzo .eredmeny").innerHTML = "";
    shows_ans = false;
}