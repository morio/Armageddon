async function copy_clipboard(event)
{
  try {

    await navigator.clipboard.writeText(event.target.value);
    const alert_msg = document.querySelector(".alert-fixed"); 
    alert_msg.style.display = "block";
    setTimeout(() => {alert_msg.style.display = "none"; event.target.blur();}, 1000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

function update_weapon_mod()
{
    const weapon_mod_checkboxes = document.querySelectorAll(".weapon-mod-checkbox");
    title_dest = document.getElementById("weapon-mod-title");
    description_dest = document.getElementById("weapon-mod-description");


    title_dest.value = "";
    description_dest.value = "";
    count = 0;
    weapon_mod_checkboxes.forEach(checkbox => {
        if (checkbox.checked)
        {
            count++;
            title_src = document.getElementById(checkbox.id + "-title").innerText;
            description_src = document.getElementById(checkbox.id + "-description").innerText;
            if (count === 1)
            {
                title_dest.value = title_src;
                description_dest.value = description_src;
            }
            else if (count === 2)
            {
                title_dest.value += " and " + title_src;
                description_dest.value += "\n" + description_src;
            }
            else
            {
                title_dest.value = "Select only two";
                description_dest.value = "Select only two weapon modifications"
            }
        } 
    });

}

document.addEventListener('DOMContentLoaded', (event) => {
    const copy_text = document.querySelectorAll(".copy-text");
    copy_text.forEach(cpy_txt => {
        cpy_txt.addEventListener("focus", (event) => copy_clipboard(event));
    });

    const weapon_mod_checkboxes = document.querySelectorAll(".weapon-mod-checkbox");
    weapon_mod_checkboxes.forEach(checkbox => {checkbox.addEventListener("change", _ => {update_weapon_mod()})})
});

