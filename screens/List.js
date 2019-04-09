import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, ImageBackground, Dimensions, FlatList } from 'react-native';

const { width, height } = Dimensions.get('screen');
const mocks = [
    {
        id: 1,
        user: {
            name: 'Robb Winston',
            avatar: 'https://randomuser.me/api/portraits/men/51.jpg'
        },
        location: 'Amsterdam, Netherlands',
        temperature: 46,
        title: 'Amsterdam Bridge',
        description: 'Some description about this bridge...',
        rating: 4.2,
        preview: 'https://images.unsplash.com/photo-1524047934617-cb782c24e5f3?auto=format&fit=crop&w=800&q=80',
        image: [
            'https://images.unsplash.com/photo-1524047934617-cb782c24e5f3?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1447877980755-c3c642760061?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1415639636295-61ae91a98b39?auto=format&fit=crop&w=800&q=80'
        ],
        reviews: 1000
    },
    {
        id: 2,
        user: {
            name: 'Jane Austin',
            avatar: 'https://randomuser.me/api/portraits/women/24.jpg'
        },
        location: 'Kuala Lumpur, Malaysia',
        temperature: 86,
        title: 'KL Twin Tower',
        description: 'Kuala Lumpur Description bla bla...',
        rating: 4.4,
        preview: 'https://images.unsplash.com/photo-1532745609869-16df0d287f3b?auto=format&fit=crop&w=800&q=80',
        image: [
            'https://images.unsplash.com/photo-1532745609869-16df0d287f3b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1520099588925-92807b402aa4?auto=format&fit=crop&w=800&q=80',
        ],
        reviews: 1001
    },
    {
        id: 3,
        user: {
            name: 'Vy Thungh',
            avatar: 'https://randomuser.me/api/portraits/women/60.jpg'
        },
        location: 'Bangkok, Thailand',
        temperature: 78,
        title: 'Floating Market',
        description: 'some description about floating market',
        rating: 4.9,
        preview: 'https://images.unsplash.com/photo-1465905246668-219a4a7fbdaa?auto=format&fit=crop&w=800&q=80',
        image: [
            'https://images.unsplash.com/photo-1465905246668-219a4a7fbdaa?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1506781961370-37a89d6b3095?auto=format&fit=crop&w=800&q=80',
        ],
        reviews: 1002
    }

]

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    column: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    header: {
        borderBottomColor: 'white',
        backgroundColor: 'white',
        paddingHorizontal: 36,
        paddingTop: 60,
        paddingBottom: 36,
    },
    destinations: {
        flex: 2,
        justifyContent: 'space-between',
    },
    destination: {
        width: width - (36 * 2),
        height: width - (36 * 2),
        marginHorizontal: 36,
        paddingHorizontal: 36,
        paddingVertical: 24,
        borderRadius: 12,
    },
    destinationInfo: {
        position: 'absolute',
        borderRadius: 12,
        paddingHorizontal: 36,
        paddingVertical: 24,
        left: 12,
        right: 12,
        bottom: -64,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    recommended: {
        padding: 36
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    rating: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    dots: {
        width: 8,
        height: 8,
        marginHorizontal: 4,
        backgroundColor: '#DDDDDD',
        borderRadius: 4,
        borderWidth: 0,
        borderColor: 'transparent',
    },
    activeDot: {
        borderWidth: 2,
        backgroundColor: 'transparent',
        borderColor: '#8ADBFA',
    }
});

class List extends Component {
    static navigationOptions = {
        header: (
            <View style={
                [
                    styles.row, styles.header,
                    { justifyContent: 'space-between', alignItems: 'center', }
                ]}
            >
                <View>
                    <Text>Search for place</Text>
                    <Text style={{ fontSize: 24 }}>Destination</Text>
                </View>
                <View>
                    <Image style={styles.avatar} source={{ uri: 'https://randomuser.me/api/portraits/men/3.jpg' }} />
                </View>
            </View>
        )
    }

    renderDots() {
        const { destinations } = this.props;
        return (
            <View style={[styles.flex, styles.row, { justifyContent: 'center', marginTop: -(18 * 2) }]}>
                {
                    destinations.map(item => {
                        return (
                            <View key={item.id} style={[styles.dots, item.id === 1 ? styles.activeDot : null]} />
                        )
                    })
                }
            </View>
        )
    }

    renderDestinations = () => {
        return (
            <View style={[styles.destinations, styles.column]}>
                <FlatList
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    style={{ overflow: 'visible' }}
                    snapToAlignment="center"
                    data={this.props.destinations}
                    keyExtractor={(item, index) => `${item.id}`}
                    renderItem={({ item }) => this.renderDestination(item)}
                />
                {this.renderDots()}
            </View>
        );
    }

    renderDestination = item => {
        return (
            <ImageBackground
                style={[styles.flex, styles.destination, styles.shadow]}
                imageStyle={{ borderRadius: 12 }}
                source={{ uri: item.preview }}
            >
                <View style={[styles.flex, styles.row]}>
                    <View>
                        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
                    </View>
                    <View style={[styles.flex, styles.column, { flex: 2, paddingHorizontal: 12 }]}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }}>{item.user.name}</Text>
                        <Text style={{ fontSize: 12, color: 'white' }}>{item.location}</Text>
                    </View>
                    <View>
                        <Text style={styles.rating}>{item.rating}</Text>
                    </View>
                    <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingBottom: 8 }}>{item.title}</Text>
                        <Text style={{ color: 'grey' }}>{item.description}</Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    renderRecommended = item => {
        return (
            <View style={[styles.flex, styles.column]}>
                <ScrollView horizontal>
                    <View style={[styles.flex, styles.recommended]}>
                        <Text style={{ fontSize: 24 }}>Recommendations</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    render() {
        return (
            <ScrollView contentContainerStyle={[styles.flex, styles.articles]} showsVerticalScrollIndicator={false}>
                {this.renderDestinations()}
                {this.renderRecommended()}
            </ScrollView>
        );
    }
}

List.defaultProps = {
    destinations: mocks
}

export default List;
