let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';


let total = document.getElementById("total");
let interviewCount = document.getElementById("interview");
let rejectedCount = document.getElementById("rejected");

const allCardSection = document.getElementById("cardSection");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");


const mainContainer = document.querySelector(".mainSection");
const filterSection = document.getElementById("filtered-section")


// defult page
const noJobsAvailableSection = document.getElementById("noJobsAvailableSection");

allFilterBtn.addEventListener("click", function(){
    noJobsAvailableSection.classList.add("hidden");
})


function calculateCount(){ 
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}



// top small job status

function updateJobStatus(){
    const totalJobs = allCardSection.children.length;

    let visibleJobs = 0;

     if(currentStatus === 'all-filter-btn'){
        visibleJobs = totalJobs;
    }
    else if(currentStatus === 'interview-filter-btn'){
        visibleJobs = interviewList.length;
    }
    else if(currentStatus === 'rejected-filter-btn'){
        visibleJobs = rejectedList.length;
    }
    document.getElementById('job-status').innerText =
        `${visibleJobs} of ${totalJobs} jobs`;
}

// filter button style toggle
function toggleStyle(id){
    
    // if any button bg white add
    allFilterBtn.classList.add("bg-white", "text-[#64748b]");
    interviewFilterBtn.classList.add("bg-white", "text-[#64748b]");
    rejectedFilterBtn.classList.add("bg-white", "text-[#64748b]");

        // remove blue bg for all button
    allFilterBtn.classList.remove("bg-[#3b82f6]", "text-white");
    interviewFilterBtn.classList.remove("bg-[#3b82f6]", "text-white");
    rejectedFilterBtn.classList.remove("bg-[#3b82f6]", "text-white");


    const selected = document.getElementById(id);
    // clicked for filter
    currentStatus = id;
    
    // adding blue bg for current button
    selected.classList.add("bg-[#3b82f6]", "text-white");
    selected.classList.remove("text-[#64748b]", "bg-white");


        // show and hidden particular section
    // step 4 start
    // filtering while clicking the filter button (All, interview, rejected)
    if(id == 'interview-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview()
    }else if (id == 'all-filter-btn'){
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }else if (id == 'rejected-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected()
    }

    updateJobStatus();

}


// event delegation
mainContainer.addEventListener("click", function(event){

    // delete button
     if(event.target.closest('.card-delete-btn')) {
        const card = event.target.closest(".card");
        const institueName = card.querySelector(".institueName").innerText;

        // remove card from DOM
        card.remove();

        // remove from lists
        interviewList = interviewList.filter(item => item.institueName != institueName);
        rejectedList = rejectedList.filter(item => item.institueName != institueName);

        calculateCount();
        updateJobStatus();

        if(currentStatus === 'interview-filter-btn'){
            renderInterview();
        } else if(currentStatus === 'rejected-filter-btn'){
            renderRejected();
        }
        return; // stop further execution
    }


if(event.target.classList.contains('interviewBtn')){

    const parentNode = event.target.parentNode.parentNode;

    const institueName = parentNode.querySelector('.institueName').innerText;
    const workName = parentNode.querySelector('.workName').innerText;
    const workType = parentNode.querySelector('.workType').innerText;
    const workTime = parentNode.querySelector('.workTime').innerText;
    const workIncome = parentNode.querySelector('.workIncome').innerText;
    const status = parentNode.querySelector('.currentStatus').innerText;
    const notes = parentNode.querySelector('.notes').innerText;

    parentNode.querySelector('.currentStatus').innerHTML = 'InterView';

    // status button color
    const statusElement = parentNode.querySelector('.currentStatus');
        statusElement.innerHTML = 'InterView';
        statusElement.classList.remove('text-[#ef4444]', 'border-[#ef4444]', 'border');
        statusElement.classList.add('text-[#10b981]', 'border-[#10b981]', 'border', 'bg-white');


    const cardInfo = {
        institueName,
        workName,
        workType,
        workTime,
        workIncome,
        status: 'InterView',
        notes
    }

    const interviewExist = interviewList.find(item => item.institueName == cardInfo.institueName);
        if(!interviewExist){
            interviewList.push(cardInfo);
        }
        // step 2 finish

        // removing the plant from rejectedBtn
        rejectedList = rejectedList.filter(item => item.institueName != cardInfo.institueName);

        // after remove rerender the html
        if( currentStatus == 'rejected-filter-btn'){
            renderRejected();
        }
        calculateCount();
        updateJobStatus();
    
    } 
else if(event.target.classList.contains('rejectedBtn')){
    const parentNode = event.target.parentNode.parentNode;

    const institueName = parentNode.querySelector('.institueName').innerText;
    const workName = parentNode.querySelector('.workName').innerText;
    const workType = parentNode.querySelector('.workType').innerText;
    const workTime = parentNode.querySelector('.workTime').innerText;
    const workIncome = parentNode.querySelector('.workIncome').innerText;
    const status = parentNode.querySelector('.currentStatus').innerText;
    const notes = parentNode.querySelector('.notes').innerText;

    parentNode.querySelector('.currentStatus').innerHTML = 'Rejected';

    const cardInfo = {
        institueName,
        workName,
        workType,
        workTime,
        workIncome,
        status: 'Rejected',
        notes
    }

    const interviewExist = rejectedList.find(item => item.institueName == cardInfo.institueName);

    // status button color
    const statusElement = parentNode.querySelector('.currentStatus');
        statusElement.innerHTML = 'Rejected';
        statusElement.classList.remove('text-[#ef4444]', 'border-[#ef4444]', 'border');
        statusElement.classList.add('text-[#ef4444]', 'border-[#ef4444]', 'border', 'bg-white');


        if(!interviewExist){
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.institueName != cardInfo.institueName);

        if(currentStatus == 'interview-filter-btn'){
            renderInterview();
        }

        calculateCount();

    }
    updateJobStatus();

});

// render function interview
function renderInterview(){
    filterSection.innerHTML = "";

    for(let interview of interviewList){
        let div = document.createElement('div');
        div.className = 'card bg-white rounded-md p-6 border border-[#f1f2f4] flex justify-between flex-row mb-5';
        div.innerHTML =
        `
                         <!-- main div -->
                <div class="space-y-4">
                    <div class="space-y-2">
                        <h1 class="institueName text-[18px] font-bold text-[#002C5C]">${interview.institueName}</h1>
                        <p class="workName text-[#64748b]">${interview.workName}</p>
                    </div>

                     <div class="flex items-center gap-2">
                         <p class="text-[#64748b] workType">${interview.workType}</p>
                        <p class="text-[#64748b] text-[4px]"><i class="fa-solid fa-circle"></i></p>
                        <p class="text-[#64748b] workTime">${interview.workTime}</p>
                        <p class="text-[#64748b] text-[4px]"><i class="fa-solid fa-circle"></i></p>
                        <p class="text-[#64748b] workIncome">${interview.workIncome}</p>
                       </div>

                    <div class="space-y-3">
                        <h2 class="currentStatus text-[#10b981] text-[14px] py-[8px] px-[12px] rounded-md bg-white border border-[#10b981] font-semibold inline-block">${interview.status}</h2>
                        <p class="notes text-[#323b49] text-[14px]">${interview.notes}</p>
                    </div>

                <div class="flex gap-3 items-center">
                    <button class="interviewBtn text-[#10b981] btn bg-white border-[#10b981] transition hover:text-white hover:bg-[#10b981]">INTERVIEW</button>
                    <button class="rejectedBtn text-[#ef4444] btn bg-white border-[#ef4444] transition hover:text-white hover:bg-[#ef4444]">REJECTED</button>
                </div>
                </div>

                <!-- delete button -->
                <div class="relative top-2">
                    <button class="rounded-full border border-[#f1f2f4] w-[40px] h-[40px] text-[#64748b] cursor-pointer"><i class="fa-regular fa-trash-can"></i></button>
                </div>
        `
        // console.log(interview);

        filterSection.appendChild(div);
    }
}


// render function rejected
function renderRejected(){
    filterSection.innerHTML = "";

    for(let rejected of rejectedList){
        let div = document.createElement('div');
        div.className = 'card bg-white rounded-md p-6 border border-[#f1f2f4] flex justify-between flex-row mb-5';
        div.innerHTML =
        `
                         <!-- main div -->
                <div class="space-y-4">
                    <div class="space-y-2">
                        <h1 class="institueName text-[18px] font-bold text-[#002C5C]">${rejected.institueName}</h1>
                        <p class="workName text-[#64748b]">${rejected.workName}</p>
                    </div>

                    <div class="flex items-center gap-2">
                         <p class="text-[#64748b] workType">${rejected.workType}</p>
                        <p class="text-[#64748b] text-[4px]"><i class="fa-solid fa-circle"></i></p>
                        <p class="text-[#64748b] workTime">${rejected.workTime}</p>
                        <p class="text-[#64748b] text-[4px]"><i class="fa-solid fa-circle"></i></p>
                        <p class="text-[#64748b] workIncome">${rejected.workIncome}</p>
                       </div>

                    <div class="space-y-3">
                        <h2 class="currentStatus text-[#ef4444] text-[14px] py-[8px] px-[12px] rounded-md bg-white border border-[#ef4444] font-semibold inline-block">${rejected.status}</h2>
                        <p class="notes text-[#323b49] text-[14px]">${rejected.notes}</p>
                    </div>

                <div class="flex gap-3 items-center">
                    <button class="interviewBtn text-[#10b981] btn bg-white border-[#10b981] transition hover:text-white hover:bg-[#10b981]">INTERVIEW</button>
                    <button class="rejectedBtn text-[#ef4444] btn bg-white border-[#ef4444] transition hover:text-white hover:bg-[#ef4444]">REJECTED</button>
                </div>
                </div>

                <!-- delete button -->
                <div class="relative top-2">
                    <button class="rounded-full border border-[#f1f2f4] w-[40px] h-[40px] text-[#64748b] cursor-pointer"><i class="fa-regular fa-trash-can"></i></button>
                </div>
        `

        filterSection.appendChild(div);
    }
}


// initial load
calculateCount();
updateJobStatus();