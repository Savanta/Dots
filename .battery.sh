#!/usr/bin/bash

#Define the battery
Battery() {
        BATPERC=$(acpi --battery | cut -d, -f2)
        echo "$BATPERC"
}

# Print the percentage
while true; do
        echo "$(Battery)"
        sleep 1;
done

