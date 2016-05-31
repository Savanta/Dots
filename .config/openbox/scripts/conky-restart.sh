#!/bin/bash
(killall -e conky) &
(leep 1s && conky -c ~/.config/conky.conf)