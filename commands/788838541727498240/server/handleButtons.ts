import DiscordJS, { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js'
import ngrok from '@ngrok/ngrok'
import { cc } from '../../../global/funcs/customConsole'


export async function handleServerButtons(interaction: DiscordJS.ButtonInteraction) {
    let serverDefaultPort = process.env.SERVER_PORT || 30679
    /* let mapDefaultPort = process.env.MAP_PORT || 8100 */
    
    let ngrokListeners = await ngrok.listeners()
    
    let isServerOnline = false
    /* let isMapOnline = false */

    let serverListener: ngrok.Listener
    /* let mapListener: ngrok.Listener */

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

/*     const mcicon = new AttachmentBuilder(`./assets/images/mcicon.png`) */
    
    let embed = new EmbedBuilder()
        .setTitle("Servidor Bacano do wizeshi")
        .setFooter({ iconURL: client.user?.avatarURL() as string, text: 'bué fixe' })
        .setTimestamp()
        .setThumbnail('attachment://mcicon.png')
        .setColor("#52A436")

    switch (interaction.customId) {
        case 'toggleserver':
            if (!isServerOnline) {
                serverListener = await ngrok.forward({
                    addr: serverDefaultPort,
                    metadata: `{ "type": "mainserver", "port": ${serverDefaultPort} }`,
                    proto: "tcp"
                })

                cc.log(`Main server opened: ${serverListener.url()?.replace("tcp://", "")}`)

                isServerOnline = true
            } else {
                //@ts-ignore
                cc.log(`Main server closed: ${serverListener.url()?.replace("tcp://", "")}`)
                //@ts-ignore
                await serverListener.close()

                isServerOnline = false
            }

            break

        /* case 'togglemap':
            if (!isMapOnline) {
                mapListener = await ngrok.forward({
                    addr: mapDefaultPort,
                    metadata: `{ "type": "map", "port": ${mapDefaultPort} }`,
                    proto: "tcp"
                })

                cc.log(`Map server opened: ${mapListener.url()?.replace("tcp://", "")}`)

                isMapOnline = true
            } else {
                //@ts-ignore
                cc.log(`Map server closed: ${mapListener.url()?.replace("tcp://", "")}`)
                
                //@ts-ignore
                await mapListener.close()


                isMapOnline = false
            }
            break */
    }

        
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

    interaction.update({
        embeds: [embed],
        components: [buttons],
    })

}