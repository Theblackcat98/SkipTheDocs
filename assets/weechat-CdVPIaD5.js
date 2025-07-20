const n=`---
toolName: "weechat.conf"
author: ""
description: ""
version: "0.0"
repositoryUrl: "https://github.com/"
---
#
# weechat.conf
#

[look]
    align_end_of_lines = message
    bar_more_down = "++"
    bar_more_up = "--"
    color_inactive_window = darkgray
    day_change = on
    day_change_message_1 = "-- %a, %d %b %Y --"
    day_change_message_2 = ""
    hotlist_count_max = 2
    hotlist_count_min_msg = 2
    hotlist_prefix = "H: "
    hotlist_suffix = ""
    input_cursor = " >"
    item_buffer_filter = "*"
    prefix_action = " *"
    prefix_align_max = 0
    prefix_align_min = 0
    prefix_align_more = "+"
    prefix_align_more_after = on
    prefix_buffer_align = right
    prefix_error = "=!="
    prefix_join = "-->"
    prefix_network = "--"
    prefix_quit = "<--"
    prefix_suffix = " |"
    read_marker = line
    read_marker_string = "- "
    separator_buffer = ""
    separator_buffer_input = ""
    separator_channel = ""
    separator_vertical = ""
    set_title = on
    show_nick_change = on
    show_nick_change_once = on
    show_part_message = on
    show_quit_message = on
    show_tags = off
    show_time = on
    time_format = "%H:%M:%S"

[irc]
    server_default.nicks = "your_nick"
    server_default.realname = "Your Name"
    server_default.username = "your_nick"
    server.libera.addresses = "irc.libera.chat/6697"
    server.libera.autoconnect = on
    server.libera.autojoin = "#weechat"
    server.libera.ssl = on

[plugins]
    autoload = "alias,buflist,colorize_nicks,exec,fifo,fset,grep,irc,logger,relay,script,spell,trigger,url,xfer"

[relay]
    irc.weechat = on
`;export{n as default};
