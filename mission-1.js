
function select_anomaly(event)
{
    const anomalies = document.querySelectorAll('.anomalies');
    anomalies.forEach(element => {
        element.style.display = "none";
    });
    const anomaly_set_1_value = document.getElementById('anomaly-set-1').value;
    localStorage.setItem("m1-anomaly-set-1", anomaly_set_1_value);
    const anomaly_set_2_value = document.getElementById('anomaly-set-2').value;
    localStorage.setItem("m1-anomaly-set-2", anomaly_set_2_value);
    let anomaly = document.querySelector("." + anomaly_set_1_value);
    if (anomaly)
        anomaly.style.display = "block";
    anomaly = document.querySelector("." + anomaly_set_2_value);
    if (anomaly)
        anomaly.style.display = "block";
}

function select_datasheet(event)
{
    const datasheets = document.querySelectorAll('.datasheet');
    const selection = document.querySelector("." + event.target.value);
    localStorage.setItem("m1-select-datasheet", event.target.value);
    if (selection)
    {
        datasheets.forEach(element => {element.style.display = "none"});
        selection.style.display = "block";
    }
    else
    {
        datasheets.forEach(element => {element.style.display = "block"});
    }
}

function select_tactical_agenda(event)
{
    const tactical_agendas = document.querySelectorAll(".tactical-agenda");
    tactical_agendas.forEach(element => {element.style.display = "none"});
    const tactical_agenda = document.querySelector("." + event.target.value);
    localStorage.setItem("m1-select-tactical-agenda", event.target.value);
    if (tactical_agenda)
        tactical_agenda.style.display = "block";
}

function check_agenda()
{
    const agenda_checkboxes = document.querySelectorAll(".agenda-checkbox");
    let checked = [];
    agenda_checkboxes.forEach(checkbox => {
        if (checkbox.checked)
        {
            document.querySelector("." + checkbox.id + "-reminder").style.display = "block";
            checked.push(checkbox.id);
        }
        else
        {
            document.querySelector("." + checkbox.id + "-reminder").style.display = "none";
        }
    })
    localStorage.setItem("m1-agendas", JSON.stringify(checked));
}


function update_other_agenda()
{
    let has_other_agenda = false;

    for (let i = 1; i <= 4; i++)
    {
        const other_agenda_title = document.getElementById("other-agenda-title-" + i);
        const other_agenda_text_area = document.getElementById("other-agenda-text-area-" + i);
        const current_reminder = document.getElementById("other-agenda-reminder-" + i);


        const other_agenda_header = document.querySelector("#other-agenda-reminder-" + i + " .other-agenda-reminder-header");
        other_agenda_header.textContent = other_agenda_title.value;
        localStorage.setItem("m1-other-agenda-title-" + i,  other_agenda_title.value);
        const other_agenda_description = document.querySelector("#other-agenda-reminder-" + i + " .other-agenda-reminder-description");
        other_agenda_description.textContent = other_agenda_text_area.value;
        localStorage.setItem("m1-other-agenda-description-" + i, other_agenda_text_area.value);

        if (other_agenda_text_area.value.length === 0 && other_agenda_title.value.length === 0)
        {
            current_reminder.style.display = "none";
        }
        else
        {
            has_other_agenda = true;
            current_reminder.style.display = "block";
        }
    }
    const reminder_group = document.querySelector(".other-agenda-reminder-group");
    if (has_other_agenda)
    {
        reminder_group.style.display = "block";
    }
    else
    {
        reminder_group.style.display = "none";
    }
}


function check_blessing()
{
    const blessing_checkboxes = document.querySelectorAll(".blessing-checkbox");
    let checked = [];
    blessing_checkboxes.forEach(checkbox => {
        if (checkbox.checked)
        {
            document.querySelector("." + checkbox.id + "-reminder").style.display = "block";
            checked.push(checkbox.id);
        }
        else
        {
            document.querySelector("." + checkbox.id + "-reminder").style.display = "none";
        }
    })
    localStorage.setItem("m1-blessings", JSON.stringify(checked));
    const blessing_reminder_header = document.querySelector(".blessing-reminder-header");
    if (checked.length > 0)
    {
        blessing_reminder_header.style.display = "block";
    }
    else
    {
        blessing_reminder_header.style.display ="none";
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const anomaly_set_1 = document.getElementById('anomaly-set-1');
    anomaly_set_1.addEventListener("change", (event) => {select_anomaly(event)});
    anomaly_set_1.value = localStorage.getItem("m1-anomaly-set-1") || "none";

    const anomaly_set_2 = document.getElementById('anomaly-set-2');
    anomaly_set_2.addEventListener("change", (event) => {select_anomaly(event)});
    anomaly_set_2.value = localStorage.getItem("m1-anomaly-set-2") || "none";
    anomaly_set_2.dispatchEvent(new Event("change"));

    const datasheet = document.getElementById("datasheet-selector");
    datasheet.addEventListener("change", (event) => {select_datasheet(event)});
    datasheet.value = localStorage.getItem("m1-select-datasheet") || "none";
    datasheet.dispatchEvent(new Event("change"));

    const tactical_agenda = document.getElementById("tactical-agenda-set");
    tactical_agenda.addEventListener("change", (event) => {select_tactical_agenda(event)});
    tactical_agenda.value = localStorage.getItem("m1-select-tactical-agenda") || "none";
    tactical_agenda.dispatchEvent(new Event("change"));


    const agenda_json = localStorage.getItem("m1-agendas");
    if (agenda_json)
    {
        let agendas = JSON.parse(agenda_json);
        agendas.forEach(agenda => {
            document.getElementById(agenda).checked = true;
        });
        check_agenda();
    }

    const agenda_checkboxes = document.querySelectorAll(".agenda-checkbox");
    agenda_checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", (_) => {check_agenda();});
    });

    for (let i = 1; i <= 4; i++)
    {
        const other_agenda_title = document.getElementById("other-agenda-title-" + i);
        const other_agenda_text_area = document.getElementById("other-agenda-text-area-" + i);
        const other_agenda_title_text = localStorage.getItem("m1-other-agenda-title-" + i);
        const other_agenda_description_text = localStorage.getItem("m1-other-agenda-description-" + i);
        if (other_agenda_title_text)
            other_agenda_title.value = other_agenda_title_text;
        if (other_agenda_description_text)
            other_agenda_text_area.value = other_agenda_description_text;
        other_agenda_title.addEventListener("input", (_) => update_other_agenda());
        other_agenda_text_area.addEventListener("input", (_) => update_other_agenda());
    }
    update_other_agenda();

    const blessing_json = localStorage.getItem("m1-blessings");
    if (blessing_json)
    {
        let blessings = JSON.parse(blessing_json);
        blessings.forEach(blessing => {
            document.getElementById(blessing).checked = true;
        });
        check_blessing();
    }

    const blessing_checkboxes = document.querySelectorAll(".blessing-checkbox");
    blessing_checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", (_) => {check_blessing();});
    });


});