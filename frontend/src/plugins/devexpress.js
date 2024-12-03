import { createApp } from 'vue'
import 'devextreme/dist/css/dx.common.css'
import '../assets/theme.css'
import ptMessage from 'devextreme/localization/messages/pt'
import { locale, loadMessages } from 'devextreme/localization'

import { DxTextArea } from 'devextreme-vue'

const app = createApp({})

app.component('DxTextArea', DxTextArea)
loadMessages(ptMessage)
locale('pt')
