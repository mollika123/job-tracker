let total = document.getElementById('totalCount')
let interviewCount = document.getElementById('interviewCount')
let rejectedCount = document.getElementById('rejectedCount')

let interviews = []
let rejected = []

let mainContainer = document.querySelector('#main-container')
const allCardSection = document.getElementById('allCards')
let filterSection = document.getElementById('filtered-section')
let jobs = document.getElementById('jobs')
let jobsLength = allCardSection.children.length

jobs.innerText = jobsLength + ' jobs'
interviewCount.innerText = interviews.length
rejectedCount.innerText = rejected.length

function countTotal() {
    total.innerText = allCardSection.children.length
}

countTotal()

const allFilterBtn = document.getElementById('allBtn')
const interviewFilterBtn = document.getElementById('interviewBtn')
const rejectedFilterBtn=document.getElementById('rejectedBtn')


function showEmptyCard() {
    const emptyCard = `<div class="empty-card py-10 flex flex-col items-center justify-center  bg-gray-100 "><img src="./jobs.png"/><h3>No jobs available</h3><p>Check back soon for new job opportunities</p></div>`
    document.getElementById('filtered-section').innerHTML = emptyCard
}

let activeFilter = 'all'

function toggleStyle(id) {
    allFilterBtn.classList.remove('bg-blue-500', 'text-white')
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white')
    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white')

 
    allFilterBtn.classList.add('bg-gray-500', 'text-white')
    interviewFilterBtn.classList.add('bg-gray-500', 'text-white')
    rejectedFilterBtn.classList.add('bg-gray-500', 'text-white')


    let selected = document.getElementById(id)

    selected.classList.remove('bg-gray-500', 'text-white')
    selected.classList.add('bg-black', 'text-white')

    // selected.addEventListener

    if (id == 'interviewBtn') {
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        jobs.innerText = interviews.length + ' of ' + jobsLength + ' jobs'

        activeFilter = 'interview'

        if (interviews.length == 0) {
            showEmptyCard()
            return
        }

        renderJob('interview')
    } else if (id == 'rejectedBtn') {
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        jobs.innerText = rejected.length + ' of ' + jobsLength + ' jobs'

        activeFilter = 'rejected'

        if (rejected.length == 0) {
            showEmptyCard()
            return
        }

        renderJob('rejected')
    } else {
        activeFilter = 'all'

        allCardSection.classList.remove('hidden')
        filterSection.classList.add('hidden')
    }

    updateCounts()
}

mainContainer.addEventListener('click', function (even) {
    const card = even.target.closest('.card')

    if (even.target.classList.contains('interview-btn')) {
        updateJobStatus(card, 'interview')
    }

    if (even.target.classList.contains('rejected-btn')) {
        updateJobStatus(card, 'rejected')
    }

    if (even.target.closest('.delete-btn')) {
        deleteJob(card)
        updateCounts()
    }
})

function updateJobStatus(card, cardStatus) {
    const title = card.querySelector('.title').innerText
    const position = card.querySelector('.position').innerText
    const type = card.querySelector('.type').innerText
    // const status = card.querySelector('.status').innerText
    const build = card.querySelector('.build').innerText

    const job = {
        title,
        position,
        type,
        status: cardStatus,
        build,
    }

    // new 
    const interviewBtn = card.querySelector('.interview-btn')
const rejectedBtn = card.querySelector('.rejected-btn')


    interviews = interviews.filter((item) => item.title !== title)
    rejected = rejected.filter((item) => item.title !== title)

    if (cardStatus === 'interview') {
        interviews.push(job)
        interviewCount.innerText = interviews.length
        card.querySelector('.status-1').innerText = 'interview'
        // renderJob('interview')

        // new 
          interviewBtn.classList.add('bg-green-500', 'text-white')
    rejectedBtn.classList.remove('bg-red-500', 'text-white')

        updateCounts()
    }

    if (cardStatus === 'rejected') {
        rejected.push(job)
        rejectedCount.innerText = rejected.length
        card.querySelector('.status-1').innerText = 'rejected'
        // renderJob('rejected' )

        // new 
        rejectedBtn.classList.add('bg-red-500', 'text-white')
    interviewBtn.classList.remove('bg-green-500', 'text-white')

        updateCounts()
    }

    if (activeFilter === 'interview') {
        if (interviews.length === 0) {
            showEmptyCard()
        } else {
            renderJob('interview')
        }
    }

    if (activeFilter === 'rejected') {
        if (rejected.length === 0) {
            showEmptyCard()
        } else {
            renderJob('rejected')
        }
    }
}

function renderJob(status) {
    filterSection.innerHTML = ''

    let data = []

    if (status === 'interview') {
        data = interviews
    } else if (status === 'rejected') {
        data = rejected
    }

    for (let item of data) {
        let statusColor =
            item.status === 'interview'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'

        let div = document.createElement('div')
        div.className =
            'flex justify-between bg-[#ffffff] shadow-2xl p-10 rounded-2xl card'

        div.innerHTML = `<div class="space-y-8">
                        <div class="">
                            <h3 class="mobile-1 text-[20px] font-bold title">${item.title}</h3>
                            <p class="react-1 position text-[#64748B]">${item.position}</p>
                        </div>

                        <div class="text-[#64748B] type">
                            <p class="remote-1">${item.type}</p>
                        </div>

                        <div class="">
                        <p class="status-1 status text-[18px] w-[120px] text-center p-[5px] ${statusColor}"> ${item.status} </p>
                        </div>

                        <div class="">
                            <p class="build build-1 text-[#64748B]">${item.build}</p>
                        </div>

                        <div class="flex gap-5 ">
                            <button id="interview-btn" class="interview-btn text-green-500 text-[20px] p-2 border-2 border-green-500 rounded-lg"">interview</button>
                            <button id="rejected-btn" class="rejected-btn text-[20px] p-2 border-2 border-red-500 text-red-500 rounded-lg">Rejected</button>
                        </div>
                    </div>

                    <div class="p-2.5 bg-[#cecfd1] h-10 rounded-full ">
                        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                    </div>
                    `

        filterSection.appendChild(div)
    }
}

function deleteJob(card) {
    const title = card.querySelector('.title').innerText

    // remove from both arrays
    interviews = interviews.filter((item) => item.title !== title)
    rejected = rejected.filter((item) => item.title !== title)

    updateCounts()

    interviewCount.innerText = interviews.length
    rejectedCount.innerText = rejected.length

    // remove DOM card
    card.remove()

    jobsLength=allCardSection.children.length
    
    updateCounts()

    if (activeFilter === 'interview') {
        if (interviews.length === 0) {
            showEmptyCard()
        } else {
            renderJob('interview')
        }
    }

    if (activeFilter === 'rejected') {
        if (rejected.length === 0) {
            showEmptyCard()
        } else {
            renderJob('rejected')
        }
    }
}

function updateCounts() {
    total.innerText = allCardSection.children.length

    interviewCount.innerText = interviews.length
    rejectedCount.innerText = rejected.length

    if (activeFilter === 'interview') {
        jobs.innerText = interviews.length + ' of ' + jobsLength + ' jobs'
    } else if (activeFilter === 'rejected') {
        jobs.innerText = rejected.length + ' of ' + jobsLength + ' jobs'
    } else {
        jobs.innerText = jobsLength + ' jobs'
    }
}