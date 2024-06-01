import react from 'react';
import { StyleSheet, Text } from 'react-native';
import themeTextLight from '../themeTextLight';

const styles = StyleSheet.create({
    colorPrimary: {
        color: themeTextLight.colors.primary
    },
    colorSecondary: {
        color: themeTextLight.colors.secondary
    },
    title : {
        fontSize: themeTextLight.size.title
    },
    header : {
        fontSize: themeTextLight.size.header
    },
    subHeader : {
        fontSize: themeTextLight.size.subHeader
    },
    fontBold: {
        fontWeight: themeTextLight.fontWeights.bold
    },
    fontNormal: {
        fontWeight: themeTextLight.fontWeights.normal
    }
})


function StyledText({children, color, size, style, bold, ...restOfProps}) {

    const textStyles = [
        color === 'primary' && styles.colorPrimary,
        color === 'secondary' && styles.colorSecondary,
        size === 'title' && styles.title,
        size === 'header' && styles.header,
        size === 'subheader' && styles.subHeader,
        bold === 'bold' && styles.fontBold,
        bold === 'normal' && styles.fontNormal,
        style
    ]
        

    return (
        <Text style={textStyles} {...restOfProps} >
            {children}
        </Text>
    );
}

export default StyledText;