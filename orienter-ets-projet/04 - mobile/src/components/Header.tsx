import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
declare module 'react-native-vector-icons/MaterialIcons';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* ... existing header content ... */}
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon name="person" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};
