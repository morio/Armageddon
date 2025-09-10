const mission_num = 3

function select_alliance()
{
    const alliance_set = document.querySelectorAll(".alliance");
    const alliance_select = document.getElementById("alliance-select");
    localStorage.setItem("m"+mission_num+"-alliance-select", alliance_select.value);
    alliance_set.forEach(alliance => {
        alliance.style.display = "none";
    });
    if (alliance_select.value && alliance_select.value !== "none")
    {
        const alliance_selected = document.querySelector("." + alliance_select.value);
        alliance_selected.style.display = "block";
    }
}

function select_anomaly()
{
    const anomalies = document.querySelectorAll('.anomalies');
    anomalies.forEach(element => {
        element.style.display = "none";
    });
    const anomaly_set_1_value = document.getElementById('anomaly-set-1').value;
    localStorage.setItem("m"+mission_num+"-anomaly-set-1", anomaly_set_1_value);
    let anomaly = document.querySelector("." + anomaly_set_1_value);
    if (anomaly)
        anomaly.style.display = "block";
    
    const set_2 = document.getElementById('anomaly-set-2')
    if (set_2)
    {
        const  anomaly_set_2_value = set_2.value;
        localStorage.setItem("m"+mission_num+"-anomaly-set-2", anomaly_set_2_value);
        anomaly = document.querySelector("." + anomaly_set_2_value);
        if (anomaly)
            anomaly.style.display = "block";
    }
}

function select_datasheet()
{
    const datasheets = document.querySelectorAll('.datasheet');
    const selectors = document.querySelectorAll(".datasheet-selector");
    let selector_index = 1;
    let selected_datasheet = [];
    const show_all_datasheets = document.getElementById("datasheet-show-all-cb").checked
    localStorage.setItem("m"+mission_num+"-show-all-datasheets", show_all_datasheets ? "true" : "");
    selectors.forEach(select_unbound => 
    {
        if (select_unbound.value !== "none")
        {
            selected_datasheet.push(select_unbound.value);
 
        }
        localStorage.setItem("m"+mission_num+"-select-datasheet-" + selector_index, select_unbound.value);
        selector_index++;
    });

    if (!show_all_datasheets && selected_datasheet.length > 0)
    {
        datasheets.forEach(element => {element.style.display = "none"});
        selected_datasheet.forEach(datasheet_name => {
            let datasheet = document.querySelector(".datasheet." + datasheet_name);
            datasheet.style.display = "block";    
        });       
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
    localStorage.setItem("m"+mission_num+"-select-tactical-agenda", event.target.value);
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
    localStorage.setItem("m"+mission_num+"-agendas", JSON.stringify(checked));
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
        localStorage.setItem("m"+mission_num+"-other-agenda-title-" + i,  other_agenda_title.value);
        const other_agenda_description = document.querySelector("#other-agenda-reminder-" + i + " .other-agenda-reminder-description");
        other_agenda_description.textContent = other_agenda_text_area.value;
        localStorage.setItem("m"+mission_num+"-other-agenda-description-" + i, other_agenda_text_area.value);

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
    localStorage.setItem("m"+mission_num+"-blessings", JSON.stringify(checked));
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
    // Alliance
    const alliance_select = document.getElementById("alliance-select");
    alliance_select.addEventListener("change", (_) => {select_alliance();});
    alliance_select.value = localStorage.getItem("m"+mission_num+"-alliance-select") || "none";
    select_alliance();

    // Anomalies
    const anomaly_set_1 = document.getElementById('anomaly-set-1');
    anomaly_set_1.addEventListener("change", (_) => {select_anomaly();});
    anomaly_set_1.value = localStorage.getItem("m"+mission_num+"-anomaly-set-1") || "none";

    
    const anomaly_set_2 = document.getElementById('anomaly-set-2');
    if (anomaly_set_2)
    {
        anomaly_set_2.addEventListener("change", (_) => {select_anomaly();});
        anomaly_set_2.value = localStorage.getItem("m"+mission_num+"-anomaly-set-2") || "none"; 
    }
    select_anomaly();

    // Datasheets
    const datasheet_selectors = document.querySelectorAll(".datasheet-selector");
    let datasheet_index = 1;
    datasheet_selectors.forEach(datasheet =>
    {
        datasheet.addEventListener("change", (_) => {select_datasheet()});
        datasheet.value = localStorage.getItem("m"+mission_num+"-select-datasheet-"+ datasheet_index) || "none";
        datasheet_index++;
    });
    const datatsheet_show_all = document.getElementById("datasheet-show-all-cb");
    if (localStorage.getItem("m"+mission_num+"-show-all-datasheets") === "true")
        datatsheet_show_all.checked = true;
    else
        datatsheet_show_all.checked = false;
    datatsheet_show_all.addEventListener("change", (_) => {select_datasheet();})
    select_datasheet();

    const tactical_agenda = document.getElementById("tactical-agenda-set");
    tactical_agenda.addEventListener("change", (event) => {select_tactical_agenda(event)});
    tactical_agenda.value = localStorage.getItem("m"+mission_num+"-select-tactical-agenda") || "none";
    tactical_agenda.dispatchEvent(new Event("change"));


    const agenda_json = localStorage.getItem("m"+mission_num+"-agendas");
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
        const other_agenda_title_text = localStorage.getItem("m"+mission_num+"-other-agenda-title-" + i);
        const other_agenda_description_text = localStorage.getItem("m"+mission_num+"-other-agenda-description-" + i);
        if (other_agenda_title_text)
            other_agenda_title.value = other_agenda_title_text;
        if (other_agenda_description_text)
            other_agenda_text_area.value = other_agenda_description_text;
        other_agenda_title.addEventListener("input", (_) => update_other_agenda());
        other_agenda_text_area.addEventListener("input", (_) => update_other_agenda());
    }
    update_other_agenda();

    const blessing_json = localStorage.getItem("m"+mission_num+"-blessings");
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