const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

// سيرفر ويب بسيط عشان البوت يظل شغال
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`HTTP server is listening on port ${PORT}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`تم تسجيل الدخول بنجاح! البوت شغال باسم ${client.user.tag}`);
});

// إعطاء الرتبة تلقائياً عند دخول أي عضو جديد للسيرفر
client.on('guildMemberAdd', async member => {
    const roleId = '1564986433968799835'; // أيدي رتبة الأعضاء الجدد
    const guildId = '1564845550497693767'; // أيدي السيرفر

    if (member.guild.id !== guildId) return;

    try {
        await member.roles.add(roleId);
        console.log(`تم إعطاء الرتبة للعضو الجديد بنجاح`);
    } catch (error) {
        console.error('خطأ في إعطاء الرتبة:', error);
    }
});

// تسجيل دخول البوت بالتوكن الجديد
client.login('MTU2NTAxMjg1NjI5Mjc2OTg1NA.Gh3LJt.MSGBSlJFdrP6ODXvMRgBkj1d931BNvp-cnShoo');
