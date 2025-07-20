const t=`[org/mate/desktop/interface]
gtk-theme='Mint-MATE'
icon-theme='Mint-MATE'
document-font-name='Sans 10'
monospace-font-name='Monospace 10'
font-name='Ubuntu 10'

[org/mate/panel/toplevels/top/objects/clock]
object-type='applet'
applet-iid='ClockAppletFactory::ClockApplet'
position=0
panel-right-stick=true

[org/mate/panel/toplevels/top/objects/notification-area]
object-type='applet'
applet-iid='NotificationAreaAppletFactory::NotificationArea'
position=1
panel-right-stick=true
`;export{t as default};
