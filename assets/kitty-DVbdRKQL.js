const n=`---
displayName: Kitty.conf
toolName: kitty.conf
author: ''
description: ''
tags: []
version: '0.0'
repositoryUrl: https://github.com/
relatedConfigs: ''
lastModified: '2025-07-21T09:10:44.620486Z'
---
# kitty.conf

# Font
font_family      monospace
bold_font        auto
italic_font      auto
bold_italic_font auto
font_size 11.0

# Cursor
cursor #cccccc
cursor_text_color #111111
cursor_shape block
cursor_beam_thickness 1.5
cursor_underline_thickness 2.0
cursor_blink_interval -1
cursor_stop_blinking_after 15.0

# Scrollback
scrollback_lines 2000
scrollback_pager less +G -R
wheel_scroll_min_lines 1
touch_scroll_multiplier 1.0

# Mouse
mouse_hide_wait 3.0
url_color #0087bd
url_style d-curl
open_url_with default
url_prefixes file ftp ftps gemini git gopher http https irc ircs kitty mailto news sftp ssh
detect_urls yes

# Performance
repaint_delay 10
input_delay 3
sync_to_monitor yes

# Bell
enable_audio_bell no
visual_bell_duration 0.0
visual_bell_color none
bell_on_tab "🔔 "

# Window layout
remember_window_size  yes
initial_window_width  640
initial_window_height 400
window_padding_width 0
window_border_width 1
draw_minimal_borders yes
active_border_color #00ff00
inactive_border_color #cccccc
bell_border_color #ff5a00
inactive_text_alpha 1.0

# Tab bar
tab_bar_edge bottom
tab_bar_margin_width 0.0
tab_bar_style fade
tab_fade 0.25 0.5 0.75 1
tab_title_template "{title}{' :{}:'.format(num_windows) if num_windows > 1 else ''}"
active_tab_foreground   #000
active_tab_background   #eee
active_tab_font_style   bold-italic
inactive_tab_foreground #444
inactive_tab_background #999
inactive_tab_font_style normal

# Color scheme
foreground #dddddd
background #000000
selection_foreground #ffffff
selection_background #555555
color0 #000000
color8 #767676
color1 #cc0403
color9 #ff0000
color2 #19cb00
color10 #3bce00
color3 #cecb00
color11 #ffff00
color4 #0d73cc
color12 #1482ff
color5 #cb1ed1
color13 #ff22ff
color6 #0dcdcb
color14 #15ffff
color7 #dddddd
color15 #ffffff
`;export{n as default};
