const n=`#
# cmus configuration file
#

#
# Colors
#
color win_bg            default
color win_fg            default
color win_title_bg      default
color win_title_fg      cyan
color win_border        blue
color win_border_bg     default
color status_bg         default
color status_fg         blue
color cmdline_bg        default
color cmdline_fg        default
color error             red
color info              yellow
color playing           green
color volume            magenta
color a_current         black   green

#
# Keybindings
#
bind common           j       win-down
bind common           k       win-up
bind common           l       win-right
bind common           h       win-left
bind common           space   win-toggle
bind common           c       player-pause
bind common           x       player-stop
bind common           v       player-next
bind common           z       player-prev
bind common           b       player-seek -5s
bind common           f       player-seek +5s
bind common           -       vol -1
bind common           =       vol +1
bind common           m       toggle mute
bind common           a       add
bind common           d       remove
bind common           u       update
bind common           s       search
bind common           /       search-next
bind common           ?       search-prev
bind common           q       quit
`;export{n as default};
