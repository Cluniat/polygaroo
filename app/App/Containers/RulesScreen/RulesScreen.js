import React from 'react'
import { View, ScrollView, StatusBar, Image } from 'react-native'
import styles from './RulesScreenStyle'
import { Colors, Helpers, Images, Metrics } from 'App/Theme'
import AppText from 'App/Components/AppText/AppText'

class RulesScreen extends React.Component {
  renderRole(logo, text) {
    return (
      <View style={[Helpers.colCenter, Metrics.mediumHorizontalPadding]}>
        <Image source={logo} style={styles.roleLogo} />
        <AppText style={styles.roleText}>{text}</AppText>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor={Colors.accent} barStyle={'light-content'} />
        <View style={Helpers.center}>
          <Image source={Images.logoInverted} style={styles.logo} />
        </View>
        <AppText style={styles.mainText}>
          {`L'action du jeu `}
          <AppText style={styles.accentText}>{`POLYGAROO`}</AppText>
          <AppText style={styles.mainText}>{` se déroule dans l'école `}</AppText>
          <AppText style={styles.accentText}>{`Polytech Lyon`}</AppText>
          <AppText style={styles.mainText}>
            {` sur le campus de La Doua à Villeurbanne. Cette école forme des `}
          </AppText>
          <AppText style={styles.accentText}>{`ingénieurs`}</AppText>
          <AppText style={styles.mainText}>
            {` depuis 1992, elle se divise en 6 départements regroupant plus de `}
          </AppText>
          <AppText style={styles.accentText}>{`650 élèves`}</AppText>
          <AppText style={styles.mainText}>
            {` chaque année. Forte de son accréditation de la `}
          </AppText>
          <AppText style={styles.accentText}>{`CTI`}</AppText>
          <AppText style={styles.mainText}>
            {` (Commission des Titres de l'Ingénieur), Polytech Lyon diplôme chaque année de nombreux ingénieurs appréciés dans le monde du travail. Néanmoins, il arrive que certains étudiants échouent et ne soient jamais diplômés : on les appelle les `}
          </AppText>
          <AppText style={styles.accentText}>{`Recalés`}</AppText>
          <AppText style={styles.mainText}>
            {`. Frustrés et déçus de ne pas avoir été à la hauteur, ces derniers se cachent dans l'école et tentent, à chaque `}
          </AppText>
          <AppText style={styles.accentText}>{`examen`}</AppText>
          <AppText style={styles.mainText}>
            {`, de faire échouer les étudiants.
Le jeu se déroule selon une alternance semaine d'examens/semaine de cours.
Durant la `}
          </AppText>
          <AppText style={styles.accentText}>{`semaine d'examens`}</AppText>
          <AppText
            style={styles.mainText}
          >{`, les Recalés se concertent pour choisir un `}</AppText>
          <AppText style={styles.accentText}>{`étudiant`}</AppText>
          <AppText style={styles.mainText}>
            {` à faire échouer. Ils ont un temps limité pour s'accorder sur une victime qui échouera et sera bannie. A la publication des `}
          </AppText>
          <AppText style={styles.accentText}>{`résultats`}</AppText>
          <AppText style={styles.mainText}>
            {` , l'ensemble de l'école se réunit et tout le monde débat, de nouveau durant un temps limité, pour débusquer les Recalés. Chaque `}
          </AppText>
          <AppText style={styles.accentText}>{`semaine de cours`}</AppText>
          <AppText style={styles.mainText}>
            {` se termine par un vote à l'issu duquel la personne la plus désignée est `}
          </AppText>
          <AppText style={styles.accentText}>{`bannie`}</AppText>
          <AppText style={styles.mainText}>
            {` de l'école et du réseau Polytech.
Les étudiants tentent de deviner qui est Recalé pour en débarrasser l'école. Quant aux Recalés, ils tentent de se fondre dans la masse des étudiants pour détourner les soupçons, rester dans l'école et avoir le temps de faire échouer tout le monde.
Certaines personnes de l'école possèdent des `}
          </AppText>
          <AppText style={styles.accentText}>{`pouvoirs spécifiques`}</AppText>
          <AppText style={styles.mainText}>
            {` qu'ils exercent les semaines d'examens ou de cours dans le but d'aider les étudiants à bannir les Recalés de l'école définitivement.`}
          </AppText>
        </AppText>
        <AppText style={styles.mainText}>
          {`Les règles détaillées pour chaque rôle sont exposées ci-dessous :`}
        </AppText>
        {this.renderRole(
          Images.etudiant,
          "Son objectif est d'éliminer tous les recalés. Il ne dispose d'aucun pouvoir particulier et doit compter uniquement sur ses capacités hors-normes d'ingénieur Polytech."
        )}
        {this.renderRole(
          Images.recale,
          "Son objectif est de faire échouer tous les étudiants (tout ceux qui ne sont pas recalés). Chaque semaine d'examens, il se réunit avec ses camarades recalés pour décider d'une victime à éliminer...."
        )}
        {this.renderRole(
          Images.peip1,
          "Son objectif est d'éliminer tous les recalés. Chaque semaine d'examens, il peut espionner les recalés."
        )}
      </ScrollView>
    )
  }
}

export default RulesScreen
