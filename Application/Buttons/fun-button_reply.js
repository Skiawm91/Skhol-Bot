const fs = require('node:fs');
module.exports = {
    data: {
        "custom_id": 'fun-button_reply',
    },
    async execute(interaction){
        const filePath = 'Application/Buttons/fun-button_data.json';
        let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const id = parseInt(interaction.customId.split("_").pop(), 10); 
        const buttonInfo = data.buttons.find(btn => btn.id === id);
        if (buttonInfo) {
            await interaction.deferReply({ ephemeral: true });
            await interaction.followUp({ content: buttonInfo.message });
        }
    },
}