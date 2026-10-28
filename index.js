const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const http = require('http');

// سيرفر ويب بسيط عشان Render يظل شغال 24 ساعة وما يفصل
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Anas Bot is running!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`HTTP server is listening on port ${PORT}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once('ready', () => {
    console.log(`تم تسجيل الدخول بنجاح! البوت شغال باسم ${client.user.tag}`);

    const channelId = '1564996936191320195'; // أيدي الروم الصوتي
    const guildId = '1564845550497693767'; // أيدي السيرفر

    const guild = client.guilds.cache.get(guildId);
    if (guild) {
        const channel = guild.channels.cache.get(channelId);
        if (channel) {
            joinVoiceChannel({
                channelId: channel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
                selfDeaf: false,
            });
            console.log('تم دخول البوت للروم الصوتي بنجاح');
        } else {
            console.log('لم يتم العثور على الروم الصوتي، تأكد من الأيدي');
        }
    }
});

// إعطاء الرتبة تلقائياً عند دخول أي عضو جديد للسيرفر
client.on('guildMemberAdd', async member => {
    const roleId = '1564986433968799835'; // أيدي رتبة الأعضاء الجدد
    try {
        await member.roles.add(roleId);
        console.log(`تم إعطاء الرتبة للأعضاء الجدد تلقائياً`);
    } catch (error) {
        console.error('خطأ في إعطاء الرتبة:', error);
    }
});

// تسجيل دخول البوت مباشرة بالتوكن الصحيح
client.login('MTU2NTAxMjg1NjI5Mjc2OTg1NA.GX683g.CQtsPnCemqXitixPLYw-5_c2kk54u9mUHA73Ok');
