import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";


function Accordion({title, valores, styleButtonPrincipal, styleList, styleItemList, font, styleContainer, setDecision}) {
    const [expanded, setExpanded] = React.useState(false);
    const [dropdownItems, setDropdownItems] = React.useState(valores);
    const [selected, setSelected] = React.useState(-1);

    const pressAccordion = () => {
        setExpanded(!expanded);
        //console.log(dropdownItems)
    }


    return (
        <View style={[styles.container, styleContainer]}>
            <TouchableOpacity
                onPress={pressAccordion}
                style={styleButtonPrincipal}
            >
                <Text style={[styles.textButton, font]}>
                    {selected === -1 ? title : valores[selected].text}
                </Text>
            </TouchableOpacity>

            {expanded && (
                <View style={[styles.dropdown, styleList]}>
                    {valores.map((valor, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styleItemList, {zIndex: 100}]}
                            onPress={() => { setExpanded(false); setSelected(index); setDecision(index) }}
                        >
                            <Text
                                style={[styles.textDropdownItem, font, {zIndex: 100}]}
                            >
                                {valor.text}
                            </Text>

                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    )
}

export default Accordion;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    textButton: {
        textAlign: "left",
        paddingLeft: 15,
        paddingVertical: 5
    },
    dropdown: {
        position: 'absolute',
        top: 35, // Ajusta según sea necesario
        width: '80%',
        zIndex: 1,
        elevation: 2,
        paddingBottom: 10
    },
    textDropdownItem: {
        textAlign: "center"
    }
})