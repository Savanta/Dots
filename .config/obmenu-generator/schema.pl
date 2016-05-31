#!/usr/bxin/perl

# obmenu-generator - schema file

=for comment

    item:      add an item inside the menu               {item => ["command", "label", "icon"]},
    cat:       add a category inside the menu             {cat => ["name", "label", "icon"]},
    sep:       horizontal line separator                  {sep => undef}, {sep => "label"},
    pipe:      a pipe menu entry                         {pipe => ["command", "label", "icon"]},
    raw:       any valid Openbox XML string               {raw => q(xml string)},
    begin_cat: begin of a category                  {begin_cat => ["name", "icon"]},
    end_cat:   end of a category                      {end_cat => undef},
    obgenmenu: generic menu settings                {obgenmenu => ["label", "icon"]},
    exit:      default "Exit" action                     {exit => ["label", "icon"]},

=cut

# NOTE:
#    * Keys and values are case sensitive. Keep all keys lowercase.
#    * ICON can be a either a direct path to an icon or a valid icon name
#    * Category names are case insensitive. (X-XFCE and x_xfce are equivalent)

require "$ENV{HOME}/.config/obmenu-generator/config.pl";

## Text editor
my $editor = $CONFIG->{editor};

our $SCHEMA = [

    #          COMMAND                 LABEL                ICON
    {item => ['gmrun',           'Run command',       'system-run']},
    {item => ['subl3 ~/.TODO',   'TODO',	          'TODO']},
    {sep => undef},
    {item => ['terminator',      'Terminal',          'terminal']},
    {item => ['opera',           'Web Browser',       'web-browser']},
    {item => ['terminator -p ncmpcpp -e ncmpcpp',         'Ncmpcpp',       	  'ncmpcpp']},
    {item => ['ts',              'TeamSpeak3',        'TeamSpeak3']},
    {item => ['thunar',          'File Manager',      'file-manager']},
    {item => ['subl3',           'Text editor',       'text-editor']},
    {item => ['libreoffice',     'Office',            'libreoffice']},
    {sep => undef},

    {begin_cat => ['Categories']},
    #          NAME            LABEL                ICON
    {cat => ['utility',     'Accessories', 'applications-utilities']},
    {cat => ['development', 'Development', 'applications-development']},
    {cat => ['education',   'Education',   'applications-science']},
    {cat => ['game',        'Games',       'applications-games']},
    {cat => ['graphics',    'Graphics',    'applications-graphics']},
    {cat => ['audiovideo',  'Multimedia',  'applications-multimedia']},
    {cat => ['network',     'Network',     'applications-internet']},
    {cat => ['office',      'Office',      'applications-office']},
    {cat => ['other',       'Other',       'applications-other']},
    {cat => ['settings',    'Settings',    'applications-accessories']},
    {cat => ['system',      'System',      'applications-system']},
    {end_cat => undef},
    #
    {pipe => ['obbrowser /home/savant/', 'Places', 'drive-harddisk']},
    #{cat => ['qt',          'QT Applications',    'qt4logo']},
    #{cat => ['gtk',         'GTK Applications',   'gnome-applications']},
    #{cat => ['x_xfce',      'XFCE Applications',  'applications-other']},
    #{cat => ['gnome',       'GNOME Applications', 'gnome-applications']},
    #{cat => ['consoleonly', 'CLI Applications',   'applications-utilities']},

    #                  LABEL          ICON
    #{begin_cat => ['My category',  'cat-icon']},
    #             ... some items ...
    #{end_cat   => undef},

    #            COMMAND     LABEL        ICON
    #{pipe => ['obbrowser', 'Disk', 'drive-harddisk']},

    ## Generic advanced settings
    #{sep       => undef},
    #{obgenmenu => ['Openbox Settings', 'openbox']},
    #{sep       => undef},

    ## Custom advanced settings
    {begin_cat => ['Advanced settings', 'gnome-settings']},
    #
    {item => ['uguush -s',               'Screenshot', 'screen']},
    {begin_cat => ['Conky settings']},
        # Configuration files
        {item => ["$editor /home/savant/.config/conky.conf", 'Conky config']},
        #{item => ["/home/savant/.config/openbox/scripts/conky-restart.sh", 'Restart']},
        {item => ["killall conky && sleep 5 && conky -c ~/.config/conky.conf", 'Restart']},
    {end_cat => undef},
    #
    {begin_cat => ['Tint2 settings']},

        {item => ["$editor ~/.config/tint2/tint2rc", 'Tint2 config', 'text-x-source']},
        {item => ["tint2conf", 'Tint2 setup']},
        {item => ["/home/savant/.config/openbox/scripts/tint2-restart.sh", 'Restart']},
        {item => ["killall tint2", 'Stop']},

    {end_cat => undef},
        # obmenu-generator category
        {begin_cat => ['Obmenu-Generator', 'menu-editor']},
            {item => ["$editor ~/.config/obmenu-generator/schema.pl", 'Menu Schema', 'text-x-source']},
            {item => ["$editor ~/.config/obmenu-generator/config.pl", 'Menu Config', 'text-x-source']},
            {item => ["obmenu-generator -s -c", 'Reconfigure', 'obmenu']},
        {end_cat => undef},

        # Openbox category
        {begin_cat => ['Openbox', 'openbox']},
            {item => ['openbox --reconfigure',               'Reconfigure Openbox', 'openbox']},
            {item => ["$editor ~/.config/openbox/autostart", 'Openbox Autostart',   'shellscript']},
            {item => ["$editor ~/.config/openbox/rc.xml",    'Openbox RC',          'text-xml']},
            {item => ["obmenu",  'Openbox Menu',        'text-xml']},
        {end_cat => undef},
    {item => ["nitrogen", 'Set wallpaper']},
    {end_cat => undef},
    {sep => undef},

    # This option uses the default Openbox's action "Exit"
    #{exit => ['Exits', 'oblogout']},

    # This uses the 'oblogout' menu
    {item => ['oblogout', 'Exit', 'exit']},
]
