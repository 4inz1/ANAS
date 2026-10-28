const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once('ready', () => {
    console.log(`تم تسجيل الدخول بنجاح! البوت شغال باسم: ${client.user.tag}`);

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
            console.log(`تم دخول البوت للروم الصوتي بنجاح!`);
        } else {
            console.log('لم يتم العثور على الروم الصوتي، تأكد من الأيدي!');
        }
    }
});

// ميزة إعطاء الرتبة للأعضاء الجدد تلقائياً
client.on('guildMemberAdd', async member => {
    const roleId = '1564986433968799835';
    
    try {
        await member.roles.add(roleId);
        console.log(`تم إعطاء الرتبة بنجاح إلى العضو: ${member.user.tag}`);
    } catch (error) {
        console.error('حدث خطأ أثناء إعطاء الرتبة:', error);
    }
});

client.login('MTU2NTAxMjg1NjI5Mjc2OTg1NA.GGlZx5.wcXRLt93b0-Q9uM15EHLla0kGjxjXVNDWdw1Gc');