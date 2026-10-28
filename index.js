const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const http = require('http');

// سيرفر ويب بسيط عشان Render ما يقفل البوت
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is alive!\n');
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

client.on('guildMemberAdd', async member => {
    const roleId = '1564986433968799835';
    try {
        await member.roles.add(roleId);
        console.log(`تم إعطاء الرتبة للأعضاء الجدد تلقائياً`);
    } catch (error) {
        console.error('خطأ في إعطاء الرتبة:', error);
    }
});

client.login(process.env.DISCORD_TOKEN);
