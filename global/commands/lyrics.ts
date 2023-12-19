import DiscordJS, { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { lyricsExtractor } from "@discord-player/extractor";

const lyricsClient = lyricsExtractor(process.env.GENIUS_ACCESSTOKEN)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('Vê a letra de uma música! 📃')
        .addStringOption(option => 
            option
                .setName('musica')
                .setDescription('A música para pesquisar (se não escolheres, vai ser a que estiver a tocar.)')
                .setRequired(false)),

    async execute(interaction: DiscordJS.ChatInputCommandInteraction) {
        interaction.deferReply();

        function substring(length: number, value: string) {
            const replaced = value.replace(/\n/g, "--")
            const regex = `.{1,${length}}`;
            const lines = replaced
                .match(new RegExp(regex, "g"))
                ?.map(line => line.replace(/--/g, '\n'))

            return lines
        }

        const queue = client.player.queues.get(interaction.guildId as DiscordJS.GuildResolvable)
        if ((!queue || !queue.node.isPlaying()) && !interaction.options.getString('musica')) { await interaction.editReply({ content: 'Não escolheste nenhuma música, nem está a tocar nada!' }); return }

        let song = queue?.currentTrack

        const errMsg = "Nenhum resultado encontrado. ☹️"

        const query = interaction.options.getString('musica') as string || `${song?.title}${(song?.queryType == 'spotifySearch' || song?.queryType == 'spotifySong') ? ` - ${song.author}`: '' }`
        const data = await lyricsClient.search(query)
            .catch((err) => { console.log(err); interaction.editReply({ content: `${errMsg}`}); return })

        if (!data) {
            await interaction.editReply({ content: `${errMsg}` })
            return
        }

        let embeds = substring(4000, data.lyrics)?.map((value, index) => {
            const isFirst = index === 0;

            let embedToReturn = new EmbedBuilder()
                .setColor(0xb31207)
                .setTitle(isFirst ? `Letra da música **${data?.title} - ${data?.artist.name}**` : null)
                .setThumbnail(isFirst ? data.thumbnail : null)
                .setDescription(value)
                .setFooter(isFirst ? null : { text: `${data?.lyrics.split(" ").length} palavras, ${data.lyrics.length} letras 😯 | Pedido por: @${interaction.user.tag}`, iconURL: client.user?.avatarURL() as string  })


            isFirst ? null : embedToReturn.setTimestamp()

            return embedToReturn
        })

        await interaction.editReply({
            embeds: embeds
        })
    }
}