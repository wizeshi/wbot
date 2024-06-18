import DiscordJS, { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js'
import ngrok from '@ngrok/ngrok'


export async function handleServerCommand(interaction: DiscordJS.ChatInputCommandInteraction) {
    let embed = new EmbedBuilder()
        .setTitle("Servidor Bacano do wizeshi")
        .setFooter({ iconURL: client.user?.avatarURL() as string, text: 'bué fixe' })
        .setTimestamp()
        .setColor("#52A436")

    let ngrokListeners = await ngrok.listeners()
    
    const mcicon = new AttachmentBuilder(`./assets/images/mcicon.png`)

    embed.setThumbnail('attachment://mcicon.png')

    let isServerOnline = false
/*     let isMapOnline = false */

    let serverListener: ngrok.Listener
/*     let mapListener: ngrok.Listener */

    ngrokListeners.forEach((lsnr, ix) => {
        let lsnrMetadata = JSON.parse(lsnr.metadata())

        if (lsnrMetadata.type == "mainserver")  {
            serverListener = lsnr
            isServerOnline = true
        } /* else if (lsnrMetadata.type == "map") {
            mapListener = lsnr
            isMapOnline = true
        } */ else {
            //pass
        }
    })
    
    let buttons = new ActionRowBuilder<ButtonBuilder>()
    
    buttons.addComponents(
        new ButtonBuilder()
            .setCustomId("toggleserver")
            .setStyle(isServerOnline ? ButtonStyle.Danger : ButtonStyle.Success )
            .setLabel(isServerOnline ? "Desligar o Server" : "Ligar o Server"),
        /* new ButtonBuilder()
            .setCustomId("togglemap")
            .setStyle(isMapOnline ? ButtonStyle.Danger : ButtonStyle.Success )
            .setLabel(isMapOnline ? "Desligar o Live Map" : "Ligar o Live Map") */
    )
    
    embed.addFields(
        //@ts-ignore
        { name: "IP do Servidor", value: `${isServerOnline ? serverListener.url()?.replace("tcp://", "") : "O server ainda não está ligado.\n\n"}` },
        //@ts-ignore
        /* { name: "IP do Live Map", value: `${isMapOnline ? mapListener.url()?.replace("tcp://", "") : "O mapa ainda não está ligado."}` } */
    )

    interaction.reply({
        embeds: [embed],
        components: [buttons],
        files: [mcicon]
    })
}