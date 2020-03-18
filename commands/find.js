exports.run = async (client, message, args) => {
    if (args.length < 2)
        return client.embed.debug(message, client.commands.get('find').help.usage)

    switch(args[0]) {
        case 'emoji': {
            const emoji = client.find(message, args, 'emoji')

            if (!emoji) {
                const msg = await client.embed.debug(message, 'Make sure you spelt the emoji correctly. The emoji has to be from the guild your executing the command in. Also case senistive!')
                return
            }

            const msg = await client.embed.send(message, {
                desc: emoji.identifier,
                thumbnail: emoji.url
            })

            return
        }
        case 'member': {
            const member = client.find(message, args, 'member')

            if (!member) {
                const msg = await client.embed.debug(message, 'Case sensitive!')
                return
            }

            let roles = []
            member.roles.cache.forEach(role => {
                if (role.name === '@everyone' || role.hexColor === '#2f3136')
                    return
                
                roles.push(`<@&${role.id}>`)
            })

            const msg = await client.embed.send(message, {
                desc: `${member.id}`,
                fields: [
                {
                    name: 'Tag',
                    value: member.user.tag,
                    inline: true
                },
                {
                    name: 'Nickname',
                    value: member.nickname === undefined ? 'No nickname' : member.nickname,
                    inline: true
                },
                {
                    name: 'Roles',
                    value: roles.join(' '),
                    inline: false
                }],
                thumbnail: member.user.avatarURL()
            })

            return
        }
    }
}

exports.conf = {
	enabled: true,
	aliases: ['f'],
	guildOnly: true,
	permLevel: 'User'
}

exports.help = {
    name: 'find',
    usage: '<[emoji | member]> <args>'
}