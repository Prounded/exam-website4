document.addEventListener('click', checkInput);

const ALL_URL = {
    'IPA':                  'https://forms.gle/QCBGB4iMJapqYfD37',
    'Pendidikan Pancasila': '',
    'Matematika':           'https://forms.gle/2eNHVfj3ZtyTUaTs7',
    'Agama Katolik':        'https://forms.gle/EVXyrJ5YmckwwmQN9',
    'IPS':                  '',
    'Informatika':          '',
    'PJOK':                 '',
    'Kemarsudirinian':      '',
    'Bahasa Inggris':       '',
    'Prakarya':             '',
    'Bahasa Indonesia':     ''
}

const EXAM_ORDER = ['IPA', 'Pendidikan Pancasila', 'Matematika', 'Agama Katolik', 'IPS', 'Informatika',
                    'PJOK', 'Kemarsudirinian', 'Bahasa Inggris', 'Prakarya', 'Bahasa Indonesia'];

function checkInput(event) {
    if (event.target.classList.contains('examDisplayContainer') || event.target.parentElement.classList.contains('examDisplayContainer')) {
        let theLesson = '';
        if (event.target.lastChild != null) {   
            theLesson = event.target.lastChild.textContent;
        }
        else {
            theLesson = event.target.parentElement.lastChild.textContent;
        }

        if (ALL_URL[theLesson].length > 0) {
            window.location.href = ALL_URL[theLesson];
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Soal Tidak Tersedia",
                text: "Soal sedang dibuat atau memang soal tidak tersedia."
            });
        }
    }
}

function checkDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const dates = currentDate.getDate();
    const hours = currentDate.getHours();

    if (year === 2024 && month === 12 && dates < 2) {
        addExam('day 1');
    }
    else if (year === 2024 && month === 11 && dates <= 30) {
        addExam('day 1');
    }
    else if (year === 2024 && month === 12 && dates === 2) {
        if (hours < 12) {
            addExam('day 1');
        }
        else {
            addExam('day 2');
        }
    }
    else if (year === 2024 && month === 12 && dates === 3) {
        if (hours < 12) {
            addExam('day 2');
        }
        else {
            addExam('day 3');
        }
    }
    else if (year === 2024 && month === 12 && dates === 4) {
        if (hours < 12) {
            addExam('day 3');
        }
        else {
            addExam('day 4');
        }
    }
    else if (year === 2024 && month === 12 && dates === 5) {
        if (hours < 12) {
            addExam('day 4');
        }
        else {
            addExam('day 5');
        }
    }
    else if (year === 2024 && month === 12 && dates > 5 && dates < 9) {
        addExam('day 5');
    }
        
    else if (year === 2024 && month === 12 && dates === 9) {
        if (hours < 12) {
            addExam('day 5');
        }
        else {
            addExam('day 6');
        }
    }
    else if (year === 2024 && month === 12 && dates === 10) {
        if (hours < 12) {
            addExam('day 6');
        }
        else {
            addExam('exam done');
        }
    }
    else {
        addExam('exam done');
    }
}

function addExam(days) {
    function createDiv(currentExam) {
        if (document.getElementsByClassName('examDisplayContainer').length < 2) { 
            const firstElement = document.getElementsByClassName('examCurrentTitle');
            let execute = true;
            if (firstElement.length > 0) {
                if (firstElement[0].textContent === currentExam) {
                    execute = false;
                } 
            }
            if (execute) {        
                const addDiv = document.createElement('div');
                addDiv.classList.add('examDisplayContainer');
                addDiv.classList.add('examDisplayContainer');
        
                const addImage = document.createElement('img');
                addImage.src = 'takeExamImage.png';
                addImage.classList.add('takeExamImage');
        
                const currentLessons = document.createElement('div');
                currentLessons.classList.add('examCurrentTitle');
                currentLessons.textContent = currentExam;
                
                addDiv.appendChild(addImage);
                addDiv.appendChild(currentLessons);
        
                document.getElementById('examLinkContainer').appendChild(addDiv);
            }
        }
        else {
            const allElement = document.getElementsByClassName('examCurrentTitle');
            if (currentExam != allElement[0].textContent && currentExam != allElement[1].textContent) {
                const allRemove = document.getElementsByClassName('examDisplayContainer');
                for (index = 0; index < allRemove.length; index++){
                    allRemove[index].remove();
                }
            }
        }
    }
    if (days == 'day 1') {
        createDiv(EXAM_ORDER[0]);
        createDiv(EXAM_ORDER[1]);
        document.getElementById('dateDisplay').textContent = 'Senin, 2 Desember 2024';
    }
    else if (days == 'day 2') {
        createDiv(EXAM_ORDER[2]);
        createDiv(EXAM_ORDER[3]);
        document.getElementById('dateDisplay').textContent = 'Selasa, 3 Desember 2024';
    }
    else if (days == 'day 3') {
        createDiv(EXAM_ORDER[4]);
        createDiv(EXAM_ORDER[5]);
        document.getElementById('dateDisplay').textContent = 'Rabu, 4 Desember 2024';
    }
    else if (days == 'day 4') {
        createDiv(EXAM_ORDER[6]);
        createDiv(EXAM_ORDER[7]);
        document.getElementById('dateDisplay').textContent = 'Kamis, 5 Desember 2024';
    }
    else if (days == 'day 5') {
        createDiv(EXAM_ORDER[8]);
        createDiv(EXAM_ORDER[9]);
        document.getElementById('dateDisplay').textContent = 'Senin, 9 Desember 2024';
    }
    else if (days == 'day 6') {
        createDiv(EXAM_ORDER[10]);
        document.getElementById('dateDisplay').textContent = 'Selasa, 10 Desember 2024';
    }
    else {
        document.getElementById('headerTitle').textContent = 'Ujian Telah Berakhir, Terima Kasih Telah Berpartisipasi';
    }
}

checkDate();
setInterval(checkDate, 1000);
