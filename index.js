const pagenumbers=document.querySelector(".pagenumbers");
const paginationlist=document.getElementById("paginationlist");
const listitems=paginationlist.querySelectorAll("li");
const prevbutton=document.getElementById("prev")
const nextbutton=document.getElementById("next")

const contentlimit=10;
const pageCount= Math.ceil(listitems.length / contentlimit)
let currentpage=1;

const displaypagenumbers= (index) =>{
     const pagenumber=document.createElement("a");
     pagenumber.innerText=index;
    pagenumber.setAttribute('href',"#");
    pagenumber.setAttribute("index", index);
    pagenumbers.appendChild(pagenumber);
    };

    const getpagenumbers =()=>{
        for(let i=1; i<=pageCount; i++){
            displaypagenumbers(i);
        };
    };
 const disablebutton=(button)=>{
    button.classlist.add("disabled");
    button.setAttribute("disabled",true);
 };

 const enablebutton= (button)=>{
  button.classlist.remove("disabled");
  button.removeAttribute("disabled");
 };

 const controlButtonStatus=()=>{
    if(currentpage=1){
        disabledbutton(prevbutton)
    }else{
        enablebutton(prevbutton)
    }
    if(pageCount== currentpage){
        disablebutton(nextbutton)
    }else{
        enablebutton(nextbutton)
    }
};

const  handleactivepagenumber=()=>{
    document.querySelectorAll('a').forEach((button)=>{
        button.classList.remove("active");
        const pageIndex=Number(button.getAttribute("index"))
        if(pageIndex == currentpage){
            button.classList.add('active')
        };
    });
};

const setCurrentpage = (pageNum)=>{
    currentpage=pageNum;

    handleactivepagenumber();
    controlButtonStatus;
    const prevRange=(pageNum -1) * contentlimit;
    const currRange=pageNum*contentlimit;

    listitems.forEach((item,index)=>{
        item.classList.add('hidden');
        if(index >= prevRange && index< currRange){
            item.classList.remove('hidden');
        };
    });
};

window.addEventListener('load',()=>{
    getpagenumbers();
    setCurrentpage();
    prevbutton.addEventListener('click',()=>{
        setCurrentpage(currentpage -1);
    });
    nextbutton.addEventListener("click",()=>{
        setCurrentpage(currentpage +1);
    });

    document.querySelectorAll('a').forEach((button)=>{
        const pageIndex=Number(button.getAttribute('index'));

        if(pageIndex){
            button.addEventListener('click',()=>{
                setCurrentpage(pageIndex);
            });
        };
    });
});