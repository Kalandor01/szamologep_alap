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

function init()
{
    //num buttons
    for (let x = 0; x < 10; x++) {
        query(".szamok").innerHTML += `<button>${x}</button>`;
    }
    query_all(".szamok button", q=>q.onclick = clicked_num);
    //muvel buttons
    query("#osszeadas").onclick = clicked_muvjel;
    query("#kivonas").onclick = clicked_muvjel;
    query("#szorzas").onclick = clicked_muvjel;
    query("#osztas").onclick = clicked_muvjel;
    query("#dot").onclick = clicked_muvjel;
    query("#egyenlo").onclick = egyenlo;
    query("#torles").onclick = clear;
}

function clicked_num(evt)
{
    if(query(".kijelzo .eredmeny").innerHTML != "")
        clear();
    query(".kijelzo .kifejezes").innerHTML += evt.target.innerHTML;
}

function clicked_muvjel(evt)
{
    if(query(".kijelzo .eredmeny").innerHTML != "")
    {
        query(".kijelzo .kifejezes").innerHTML = query(".kijelzo .eredmeny").innerHTML;
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

function egyenlo(evt)
{
    if(query(".kijelzo .kifejezes").innerHTML != "")
    {
        let muvel = query(".kijelzo .kifejezes").innerHTML.split(muvjel);
        query(".kijelzo .kifejezes").innerHTML += evt.target.innerHTML;
        console.log(muvel);
        let eredmeny = 0;
        switch (muvjel)
        {
            case "+":
                eredmeny = parseFloat(muvel[0]) + parseFloat(muvel[1]);
                break;
            case "-":
                eredmeny = parseFloat(muvel[0]) - parseFloat(muvel[1]);
                break;
            case "*":
                eredmeny = parseFloat(muvel[0]) * parseFloat(muvel[1]);
                break;
            case "/":
                eredmeny = parseFloat(muvel[0]) / parseFloat(muvel[1]);
                break;
            default:
                eredmeny = muvel[0];
                break;
        }
        query(".kijelzo .eredmeny").innerHTML += eredmeny;
    }
}

function clear()
{
    query(".kijelzo .kifejezes").innerHTML = "";
    muvjel = null;
    query(".kijelzo .eredmeny").innerHTML = "";
}